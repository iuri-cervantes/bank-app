import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, Image } from 'react-native';
import * as S from './styles';
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { removeToken } from '../../../services/storage';
import theme from '../../../styles';
import { useTheme } from '../../../hooks/useTheme';
import ChangeTheme from '../../../components/ChangeTheme';
import LogOffIcon from '../../../assets/turn-off.png';
import ViewIcon from '../../../assets/view.png';
import HideIcon from '../../../assets/hide.png';
import AccountActionBtn from '../../../components/AccountActionBtn';
import { apiGet, apiPost } from '../../../services/api';
import DropDownPicker from 'react-native-dropdown-picker';
import MaskedTextInput, { Masks } from 'react-native-mask-input';


interface BankAccount {
    id?: number;
    bank_name: string;
    bank_code: string;
    agency_number: string;
    agency_digit: string;
    account_number: string;
    account_digit: string;
    account_type: 'corrente' | 'poupanca' | string;
    document: string;
    holder_name: string;
    created_at?: string;
    updated_at?: string;
    amount?: number;
}

interface BankAccountsResponse {
    user_bank_accounts: BankAccount[];
}

interface ItemType<T> {
    label: string;
    value: number;
};

export const Transfer: React.FC = () => {

    const { currentTheme, handleChangeTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownAllOpen, setDropdownAllOpen] = useState(false);
    const [dropdownPaymentOpen, setDropdownPaymentOpen] = useState(false);
    const [hideValue, setHideValue] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState(0);
    const [selectedDestinyAccount, setSelectedDestinyAccount] = useState(0);
    const [selectedPaymentType, setSelectedPaymentType] = useState(1);
    const [transferValue, setTransferValue] = useState('');
    const [allAccountsData, setAllAccountsData] = useState<BankAccount[]>([]);
    const [accountsData, setAccountsData] = useState<BankAccount[]>([]);
    const [items, setItems] = useState<ItemType<number>[]>([]);
    const [itemsAllAccounts, setItemsAllAccounts] = useState<ItemType<number>[]>([]);
    const [itemsPaymentType, setItemsPaymentType] = useState([
        { label: 'Pix', value: 1 },
        { label: 'TED', value: 2 },
    ]);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();;
    const handleLogout = async () => {
        await removeToken();
        navigation.reset({
            routes: [{ name: 'Login' }],
        });
    }

    const handleHideValue = () => {
        setHideValue(previous => !previous)
    }

    const handleLogoutChoice = () => {
        Alert.alert(
            'Sair',
            'Deseja mesmo sair do app?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        handleLogout();
                    },
                },
                {
                    text: 'Não',
                    style: 'cancel',
                    onPress: () => null,
                },
            ],
            { cancelable: true },
        );
    }

    const transformToPickerItems = (accounts: BankAccount[], myUser: boolean): ItemType<number>[] => {
        return accounts.map((account, index) => ({
            label: myUser ? `${account.bank_name} (•••${account.account_number.slice(-3)})` : `${account.holder_name}\n${account.bank_name} ${account.account_number}`,
            value: index,
        }));
    };

    useFocusEffect(
        useCallback(() => {
            getAccount();
            getAllAccounts();
        }, [selectedAccount]),
    );

    //tranforma o tipo do array para se adaptar ao tipo usado pela lib
    useEffect(() => {
        if (accountsData && allAccountsData)
            setItems(transformToPickerItems(accountsData, true));
        setItemsAllAccounts(transformToPickerItems(allAccountsData, false));
    }, [accountsData, allAccountsData]);

    /*
    useEffect(() => {
        if (allAccountsData)
            setItemsAllAccounts(transformToPickerItems(allAccountsData, true));
    }, [allAccountsData]);
    */

    const getAccount = async () => {
        setIsLoading(true);
        try {
            let res = await apiGet<BankAccountsResponse>('/users/bank_accounts/my');
            setAccountsData(res.user_bank_accounts);
        } catch (error: any) {
            Alert.alert('Erro!', error.response.data.error || 'Erro desconhecido, tente novamente mais tarde.');
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    };

    const getAllAccounts = async () => {
        setIsLoading(true);
        try {
            let res = await apiGet<BankAccountsResponse>('/users/bank_accounts');
            setAllAccountsData(res.user_bank_accounts);
        } catch (error: any) {
            Alert.alert('Erro!', error.response.data.error || 'Erro desconhecido, tente novamente mais tarde.');
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    };


    const handleTransfer = useCallback(async () => {
        const sendTransfer = transferValue.replace(/R\$\s*/g, '').replace(/\./g, '').replace(/,/g, '.');
        const myAmount = accountsData[selectedAccount]?.amount?.toFixed(2) ?? '0.00';
        if (sendTransfer == '' || parseFloat(sendTransfer) == 0) {
            Alert.alert('Atenção!', 'Você está tentando transferir um valor de R$ 0,00.');
            return;
        }
        if (parseFloat(sendTransfer) > parseFloat(myAmount)) {
            Alert.alert('Atenção!', 'Você está tentando transferir um valor maior do que esta conta possui.');
            return;
        }
        setIsLoading(true);
        try {
            let res = await apiPost<{ message: string }>('/users/bank_account_transfers', {
                bank_account_transfer: {
                    to_user_bank_account_id: allAccountsData[selectedDestinyAccount]?.id,
                    from_user_bank_account_id: accountsData[selectedAccount]?.id,
                    transfer_type: selectedPaymentType,
                    amount_to_transfer: parseFloat(sendTransfer),
                }
            });

            Alert.alert('Sucesso!', res.message);
            navigation.navigate('History');
            setTransferValue('');
        } catch (error: any) {
            console.log(error.response.data);
            Alert.alert('Erro!', error.response.data.message || 'Erro desconhecido, tente novamente mais tarde.');
        } finally {
            setIsLoading(false);

        }
    }, [
        transferValue,
        accountsData,
        selectedAccount,
        allAccountsData,
        selectedDestinyAccount,
        selectedPaymentType,
        apiPost,
        navigation,
        setIsLoading,
        isLoading
    ]);



    return (
        <S.MainContainer>
            {isLoading ?
                (
                    <S.ContainerInfo>
                        <S.InfoText>Carregando suas informações.</S.InfoText>
                        <S.LoadingIcon size='large' color={theme[currentTheme || 'dark'].colors.loadingIndicator} />
                    </S.ContainerInfo>
                ) :
                accountsData && accountsData != [] && allAccountsData && allAccountsData != [] &&
                (
                    <S.ContainerInfo
                        behavior={'padding'}
                        enable={true}
                    >
                        <ChangeTheme />
                        <S.OclusionBtn onPress={() => handleHideValue()}>
                            <Image
                                source={hideValue ? ViewIcon : HideIcon}
                                tintColor={theme[currentTheme || 'dark'].colors.loadingIndicator}
                                style={{ width: 30, height: 30 }}
                            />
                        </S.OclusionBtn>
                        <S.LogOffBtn onPress={() => handleLogoutChoice()}>
                            <Image
                                source={LogOffIcon}
                                tintColor={theme[currentTheme || 'dark'].colors.loadingIndicator}
                                style={{ width: 30, height: 30 }}
                            />
                        </S.LogOffBtn>
                        <S.TitleText>Realizar transferência</S.TitleText>
                        <S.SectionWrapper>
                            <S.InfoText>Sua conta:</S.InfoText>
                            <DropDownPicker
                                open={dropdownOpen}
                                value={selectedAccount}
                                items={items}
                                setOpen={setDropdownOpen}
                                setValue={setSelectedAccount}
                                setItems={setItems}
                                placeholder={'Selecione sua conta.'}
                                zIndex={3}
                            />
                        </S.SectionWrapper>
                        <S.BtnLine>
                            <S.LabelText>Saldo da sua conta:</S.LabelText>
                            {hideValue ? (
                                <S.LabelText>--------</S.LabelText>

                            ) : (
                                <S.LabelText>R$ {accountsData[selectedAccount]?.amount?.toFixed(2)}</S.LabelText>
                            )
                            }
                        </S.BtnLine>
                        <S.SectionWrapper>
                            <S.InfoText>Conta destino:</S.InfoText>
                            <DropDownPicker
                                open={dropdownAllOpen}
                                value={selectedDestinyAccount}
                                items={itemsAllAccounts}
                                setOpen={setDropdownAllOpen}
                                setValue={setSelectedDestinyAccount}
                                setItems={setItemsAllAccounts}
                                placeholder={'Selecione a conta destino.'}
                                textStyle={{ height: 40 }}
                                zIndex={2}
                            />
                        </S.SectionWrapper>
                        <S.SectionWrapper>
                            <S.InfoText>Forma de pagamento:</S.InfoText>
                            <DropDownPicker
                                open={dropdownPaymentOpen}
                                value={selectedPaymentType}
                                items={itemsPaymentType}
                                setOpen={setDropdownPaymentOpen}
                                setValue={setSelectedPaymentType}
                                setItems={setItemsPaymentType}
                                placeholder={'Selecione a forma de pagamento.'}
                                zIndex={1}
                            />
                        </S.SectionWrapper>
                        <S.SectionWrapper>
                            <S.InfoText>Valor a transferir:</S.InfoText>
                            <MaskedTextInput
                                value={transferValue}
                                onChangeText={setTransferValue}
                                mask={Masks.BRL_CURRENCY}
                                keyboardType="numeric"
                                placeholder="R$ 0,00"
                                style={{
                                    backgroundColor: theme[currentTheme || 'dark'].colors.inputContainer,
                                    borderColor: theme[currentTheme || 'dark'].colors.btnColor,
                                    borderWidth: 2,
                                    height: 50,
                                    borderRadius: 8,
                                    fontSize: 16,
                                    width: '100%',
                                    color: theme[currentTheme || 'dark'].colors.inputText,
                                }}

                            />
                        </S.SectionWrapper>

                        <S.ButtonSubmit width='100%' onPress={() => {
                            handleTransfer();
                        }}>
                            <S.BtnText>Realizar transferência</S.BtnText>
                        </S.ButtonSubmit>
                    </S.ContainerInfo>
                )
            }
        </S.MainContainer>
    );
};