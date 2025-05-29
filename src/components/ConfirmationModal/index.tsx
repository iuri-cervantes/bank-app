import React, { useState } from 'react';
import { Alert, Image, Modal } from 'react-native';
import TextInput from '../TextInput';
import * as S from './styles';
import theme from '../../styles';
import { useTheme } from '../../hooks/useTheme';
import Calendar from 'react-native-calendar-range-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaskedTextInput, { Masks } from 'react-native-mask-input';
import CalendarIcon from '../../assets/calendar.png';
import XIcon from '../../assets/x.png';

interface ConfirmationModalProps {
    isModalVisible: boolean;
    filterString: string;
    setFilterString: (filterString: string) => void;
    setIsModalVisible: (visible: boolean) => void;
    handleExecuteAction: () => void;
}

const CUSTOM_LOCALE = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje',
    year: '', // letter behind year number -> 2020{year}
};




const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isModalVisible,
    filterString,
    setFilterString,
    setIsModalVisible,
    handleExecuteAction,
}) => {
    const { currentTheme } = useTheme();
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [startDateInput, setStartDateInput] = useState('');
    const [endDateInput, setEndDateInput] = useState('');
    const [transferType, setTransferType] = useState<string | null>('');
    const [dateSelecting, setDateSelecting] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Recebidas', value: 'received' },
        { label: 'Enviadas', value: 'sent' },
    ]);

    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const hexToRgb = (hex: string) => {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    };

    const clearFilters = () => {
        setStartDateInput('');
        setEndDateInput('');
        setMinValue('');
        setMaxValue('');
        setTransferType('');
        setFilterString('');
        handleExecuteAction();
        setIsModalVisible(false)
    }

    const searchWithFilters = () => {
        const sendMinValue = minValue.replace(/R\$\s*/g, '').replace(/\./g, '').replace(/,/g, '.');
        const sendMaxValue = maxValue.replace(/R\$\s*/g, '').replace(/\./g, '').replace(/,/g, '.');

        //tratamento no envio do endDate pois mandar 2 datas iguais retorna vazio
        //ps: os registros do dia selecionado no endDate não é mostrado na listagem
        setFilterString(`start_date=${startDateInput}&end_date=${startDateInput === endDateInput ? '' : endDateInput}&min_value=${sendMinValue}&max_value=${sendMaxValue}&transfer_type=${transferType}`);
        setIsModalVisible(false);
        handleExecuteAction();
    }

    return (
        <Modal transparent animationType="slide" visible={isModalVisible}>
            <S.FullScreenModal>
                <S.ModalView>
                    <S.Header>
                        <S.TitleText>Selecione os filtros desejados</S.TitleText>
                    </S.Header>
                    <S.ModalContent>
                        {/*<TextInput
                            label="Valor minimo:"
                            value={minValue}
                            keyboardType="decimal-pad"
                            autoCapitalize="none"
                            placeholder="Valor mínimo"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors.placeholder
                            }
                            onChangeText={(text: string) => setMinValue(text)}
                            returnKeyType="done"
                        />
                        <TextInput
                            label="Valor máximo:"
                            value={maxValue}
                            keyboardType="decimal-pad"
                            autoCapitalize="none"
                            placeholder="Valor máximo"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors.placeholder
                            }
                            onChangeText={(text: string) => setMaxValue(text)}
                            returnKeyType="done"
                        />*/}
                        <S.InfoText>Valor Mínimo:</S.InfoText>
                        <MaskedTextInput
                            value={minValue}
                            onChangeText={setMinValue}
                            mask={Masks.BRL_CURRENCY}
                            keyboardType="numeric"
                            placeholder="R$ 0,00"
                            style={{
                                backgroundColor: theme[currentTheme || 'dark'].colors.inputContainer,
                                borderColor: theme[currentTheme || 'dark'].colors.btnColor,
                                borderWidth: 1,
                                height: 60,
                                borderRadius: 8,
                                fontSize: 16,
                                color: theme[currentTheme || 'dark'].colors.inputText,
                            }}

                        />
                        <S.InfoText>Valor Máximo:</S.InfoText>
                        <MaskedTextInput
                            value={maxValue}
                            onChangeText={setMaxValue}
                            mask={Masks.BRL_CURRENCY}
                            keyboardType="numeric"
                            placeholder="R$ 0,00"
                            style={{
                                backgroundColor: theme[currentTheme || 'dark'].colors.inputContainer,
                                borderColor: theme[currentTheme || 'dark'].colors.btnColor,
                                borderWidth: 1,
                                height: 60,
                                borderRadius: 8,
                                fontSize: 16,
                                color: theme[currentTheme || 'dark'].colors.inputText,
                            }}
                        />
                        <S.InfoText>Selecione o tipo de tranferência:</S.InfoText>
                        <DropDownPicker
                            open={dropdownOpen}
                            value={transferType}
                            items={items}
                            setOpen={setDropdownOpen}
                            setValue={setTransferType}
                            setItems={setItems}
                            placeholder={'Selecione o tipo de tranferência'}
                            onChangeValue={(value) => {
                                setTransferType(value);
                            }}
                            style={{
                                backgroundColor: theme[currentTheme || 'dark'].colors.inputContainer,
                                borderColor: theme[currentTheme || 'dark'].colors.btnColor,
                                height: 60
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: theme[currentTheme || 'dark'].colors.inputContainer,
                                borderColor: theme[currentTheme || 'dark'].colors.btnColor,
                            }}
                            selectedItemContainerStyle={{
                                backgroundColor: theme[currentTheme || 'dark'].colors.btnColor,
                            }}
                            textStyle={{
                                color: theme[currentTheme || 'dark'].colors.inputText,
                            }}
                            selectedItemLabelStyle={{
                                color: theme[currentTheme || 'dark'].colors.btnLabel,
                            }}
                        />
                        <S.LabelText>Filtrar por data:</S.LabelText>
                        <S.Line>
                            {startDateInput.length == 0 && endDateInput.length == 0 ? (
                                <S.InfoText>Desde de o início</S.InfoText>
                            ) : (
                                <S.InfoText>De {`${startDateInput?.slice(8, 10)}/${startDateInput?.slice(5, 7)}/${startDateInput?.slice(0, 4)}`} até {endDateInput != null && endDateInput != startDateInput ? `${endDateInput?.slice(8, 10)}/${endDateInput?.slice(5, 7)}/${endDateInput?.slice(0, 4)}` : 'hoje'}</S.InfoText>
                            )
                            }
                            <S.FilterBtn onPress={() => {
                                setStartDateInput('');
                                setEndDateInput('');
                            }}>
                                <Image
                                    source={XIcon}
                                    tintColor={theme[currentTheme || 'dark'].colors.loadingIndicator}
                                    style={{ width: 15, height: 15 }}
                                />
                            </S.FilterBtn>
                            <S.FilterBtn onPress={() => setDateSelecting(true)}>
                                <Image
                                    source={CalendarIcon}
                                    tintColor={theme[currentTheme || 'dark'].colors.loadingIndicator}
                                    style={{ width: 25, height: 25 }}
                                />
                            </S.FilterBtn>
                        </S.Line>
                        {dateSelecting &&
                            <>
                                <Calendar
                                    style={{
                                        container: {
                                            height: 400, // Give it a fixed height
                                            width: '100%',
                                            borderWidth: 4,
                                            borderRadius: 12,
                                            borderColor: theme[currentTheme || 'dark'].colors.btnColor,
                                        },
                                        monthContainer: {},
                                        weekContainer: {},
                                        monthNameText: {},
                                        dayNameText: {},
                                        dayText: {},
                                        dayTextColor: '#000',
                                        holidayColor: 'red',
                                        todayColor: '#1899d5',
                                        selectedDayTextColor: theme[currentTheme || 'dark'].colors.btnLabel,
                                        selectedDayBackgroundColor: theme[currentTheme || 'dark'].colors.btnColor,
                                        selectedBetweenDayBackgroundTextColor: `rgba(${hexToRgb(theme[currentTheme || 'dark'].colors.btnColor)}, 0.2)`,
                                    }}
                                    locale={CUSTOM_LOCALE}
                                    startDate={formattedToday}
                                    onChange={({ startDate, endDate }: any) => {
                                        setStartDateInput(startDate);
                                        setEndDateInput(endDate);
                                    }}
                                />

                                <S.BtnLine>
                                    <S.ButtonSubmit onPress={() => {
                                        setDateSelecting(false);
                                    }}>
                                        <S.BtnText>Confirmar</S.BtnText>
                                    </S.ButtonSubmit>
                                    <S.ButtonCancel onPress={() => {
                                        setDateSelecting(false);
                                    }}>
                                        <S.BtnText cancel>Cancelar</S.BtnText>
                                    </S.ButtonCancel>
                                </S.BtnLine>
                            </>
                        }
                        <S.ButtonCancel width='100%' onPress={() => {
                            clearFilters();
                        }}>
                            <S.BtnText cancel>Limpar filtros da pesquisa</S.BtnText>
                        </S.ButtonCancel>
                    </S.ModalContent>
                    <S.ButtonContainer>
                        <S.ButtonSubmit onPress={() => searchWithFilters()}>
                            <S.BtnText>Pesquisar</S.BtnText>
                        </S.ButtonSubmit>
                        <S.ButtonCancel onPress={() => setIsModalVisible(false)}>
                            <S.BtnText cancel>Fechar</S.BtnText>
                        </S.ButtonCancel>
                    </S.ButtonContainer>
                </S.ModalView>
            </S.FullScreenModal>
        </Modal>
    );
};

export default ConfirmationModal;