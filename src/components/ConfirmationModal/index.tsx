import React, { useState } from 'react';
import { Modal } from 'react-native';
import TextInput from '../TextInput';
import * as S from './styles';
import theme from '../../styles';
import { useTheme } from '../../hooks/useTheme';

interface ConfirmationModalProps {
    isModalVisible: boolean;
    filterString: string;
    setFilterString: (filterString: string) => void;
    setIsModalVisible: (visible: boolean) => void;
    handleExecuteAction: () => void;
}

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
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transferType, setTransferType] = useState('');

    return (
        <Modal transparent animationType="slide" visible={isModalVisible}>
            <S.FullScreenModal>
                <S.ModalView>
                    <S.Header>
                        <S.TitleText>Selecione os filtros desejados</S.TitleText>
                    </S.Header>
                    <S.ModalContent>
                        <TextInput
                            label="REENVIAR E-MAIL PARA:"
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Insira seu e-mail"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors.placeholder
                            }
                            onChangeText={(text: string) => setEmail(text)}
                            returnKeyType="done"
                        />
                    </S.ModalContent>
                    <S.ButtonContainer>
                        <S.ButtonSubmit onPress={handleExecuteAction}>
                            <S.BtnText>Reenviar</S.BtnText>
                        </S.ButtonSubmit>
                        <S.ButtonCancel onPress={() => setIsModalVisible(false)}>
                            <S.BtnText cancel>Limpar Filtros</S.BtnText>
                        </S.ButtonCancel>
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