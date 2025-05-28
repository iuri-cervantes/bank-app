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
import { apiGet } from '../../../services/api';
import DropDownPicker from 'react-native-dropdown-picker';

interface BankAccount {
    id: number;
    bank_name: string;
    bank_code: string;
    agency_number: string;
    agency_digit: string;
    account_number: string;
    account_digit: string;
    account_type: 'corrente' | 'poupanca' | string;
    document: string;
    holder_name: string;
    created_at: string;
    updated_at: string;
    amount: number;
}

interface BankAccountsResponse {
    user_bank_accounts: BankAccount[];
}

interface ItemType<T> {
    label: string;
    value: number;
};

export const History: React.FC = () => {

    const { currentTheme, handleChangeTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hideValue, setHideValue] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState(0);
    const [accountsData, setAccountsData] = useState<BankAccount[]>([]);
    const [items, setItems] = useState<ItemType<number>[]>([]);

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

    const transformToPickerItems = (accounts: BankAccount[]): ItemType<number>[] => {
        return accounts.map((account, index) => ({
            label: `${account.bank_name} (•••${account.account_number.slice(-3)})`,
            value: index,
        }));
    };

    useFocusEffect(
        useCallback(() => {
            getAccount();
        }, [selectedAccount]),
    );

    //tranforma o tipo do array para se adaptar ao tipo usado pela lib
    useEffect(() => {
        if (accountsData)
            setItems(transformToPickerItems(accountsData));
    }, [accountsData]);

    const getAccount = async () => {
        setIsLoading(true);
        try {
            let res = await apiGet<BankAccountsResponse>('/users/bank_accounts/my');
            setAccountsData(res.user_bank_accounts);
        } catch (error: any) {
            Alert.alert('Erro!', error.response.data.message || 'Erro desconhecido, tente novamente mais tarde.');
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <S.MainContainer>
            {isLoading ?
                (
                    <S.ContainerInfo>
                        <S.InfoText>Carregando suas informações.</S.InfoText>
                        <S.LoadingIcon size='large' color={theme[currentTheme || 'dark'].colors.loadingIndicator} />
                    </S.ContainerInfo>
                ) :
                accountsData && accountsData != [] &&
                (
                    <S.ContainerInfo>
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
                        <S.TitleText>Olá {accountsData[selectedAccount]?.holder_name}!</S.TitleText>
                        <S.SectionWrapper>
                            <S.InfoText>Conta:</S.InfoText>
                            <DropDownPicker
                                open={dropdownOpen}
                                value={selectedAccount}
                                items={items}
                                setOpen={setDropdownOpen}
                                setValue={setSelectedAccount}
                                setItems={setItems}
                                placeholder={'Selecione sua conta.'}
                            />
                        </S.SectionWrapper>
                        <S.BtnLine>
                            <S.LabelText>Seu saldo:</S.LabelText>
                            {hideValue ? (
                                <S.LabelText>--------</S.LabelText>

                            ) : (
                                <S.LabelText>R$ {accountsData[selectedAccount]?.amount.toFixed(2)}</S.LabelText>
                            )
                            }
                        </S.BtnLine>
                        <S.InfoText>O que deseja fazer?</S.InfoText>
                        <S.BtnLine>
                            <AccountActionBtn title='Transferir' destiny='Login' iconName="transfer" />
                            <AccountActionBtn title='Minhas contas' destiny='Login' iconName="accounts" />
                            <AccountActionBtn title='Extrato' destiny='Login' iconName="history" />
                        </S.BtnLine>
                    </S.ContainerInfo>
                )
            }
        </S.MainContainer>
    );
};