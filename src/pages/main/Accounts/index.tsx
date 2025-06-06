import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, Image, FlatList } from 'react-native';
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


interface BankAccountTransfer {
    id: number;
    was_success: boolean;
    transfer_type_text: string;
    amount_to_transfer: number;
    created_at: string;
    to_bank_account: BankAccount;
    from_user_bank_account: BankAccount;
}

interface BankTransfersResponse {
    bank_account_transfers: BankAccountTransfer[];
    current_page: number;
    per_page: number;
    total_pages: number;
    total_records: number;
}

interface BankAccountsResponse {
    user_bank_accounts: BankAccount[];
}

interface ItemType<T> {
    label: string;
    value: number;
};

export const Accounts: React.FC = () => {

    const { currentTheme, handleChangeTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hideValue, setHideValue] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState(0);
    const [accountsData, setAccountsData] = useState<BankAccount[]>([]);
    const [historyData, setHistoryData] = useState<BankAccountTransfer[]>([]);
    const [items, setItems] = useState<ItemType<number>[]>([]);
    const [filteredTransfers, setFilteredTransfers] = useState<BankAccountTransfer[]>([]);

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

    const isSameAccount = (account1: BankAccount, account2: BankAccount): boolean => {
        return (
            account1.bank_code === account2.bank_code &&
            account1.agency_number === account2.agency_number &&
            account1.agency_digit === account2.agency_digit &&
            account1.account_number === account2.account_number &&
            account1.account_digit === account2.account_digit
        );
    };

    useFocusEffect(
        useCallback(() => {
            getAccount();
            getHistory();
        }, [selectedAccount]),
    );

    //tranforma o tipo do array para se adaptar ao tipo usado pela lib
    useEffect(() => {
        if (accountsData)
            setItems(transformToPickerItems(accountsData));
    }, [accountsData]);

    //filtra as tranferencias por conta selecionada
    useEffect(() => {
        if (accountsData[selectedAccount] && historyData.length) {
            const currentAccount = accountsData[selectedAccount];

            const filtered = historyData.filter(transfer => {
                const isFromAccount = isSameAccount(transfer.from_user_bank_account, currentAccount);
                const isToAccount = isSameAccount(transfer.to_bank_account, currentAccount);

                return isFromAccount || isToAccount;
            });

            setFilteredTransfers(filtered);
        } else {
            setFilteredTransfers([]);
        }
    }, [accountsData, selectedAccount, historyData]);



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

    const getHistory = async () => {
        setIsLoading(true);
        try {
            let res = await apiGet<BankTransfersResponse>('/users/bank_account_transfers/statements');
            setHistoryData(res.bank_account_transfers);
        } catch (error: any) {
            Alert.alert('Erro!', error.response.data.error || 'Erro desconhecido, tente novamente mais tarde.');
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    };

    const renderTransferItem = ({ item }: { item: BankAccountTransfer }) => {
        const currentAccount = accountsData[selectedAccount];
        const isOutgoing = isSameAccount(item.from_user_bank_account, currentAccount);
        const isIncoming = isSameAccount(item.to_bank_account, currentAccount);


        /*
        const transferDate = new Date(item.created_at).toLocaleDateString('pt-BR');
        const transferTime = new Date(item.created_at).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        */

        const transferDate = `${item.created_at.slice(8, 10)}/${item.created_at.slice(5, 7)}/${item.created_at.slice(0, 4)}`;
        const transferTime = `${item.created_at.slice(11, 16)}`;

        return (
            <S.TransferItem>
                <S.TransferHeader>
                    <S.TransferType>{item.transfer_type_text}</S.TransferType>
                    <S.TransferDateTime>
                        {transferDate} às {transferTime}
                    </S.TransferDateTime>
                    <S.TransferStatus isSuccess={item.was_success}>
                        {item.was_success ? 'Sucesso' : 'Falhou'}
                    </S.TransferStatus>
                </S.TransferHeader>
                <S.Line>
                    <S.TransferDirection isOutgoing={isOutgoing}>
                        {isOutgoing ? '↗ Transf. Enviada' : '↙ Transf. Recebida'}
                    </S.TransferDirection>

                    <S.TransferAmount isOutgoing={isOutgoing}>
                        {isOutgoing ? '-' : '+'}R$ {item.amount_to_transfer.toFixed(2)}
                    </S.TransferAmount>
                </S.Line>
                <S.TransferDetails>
                    {isOutgoing ? (
                        <>
                            <S.DetailText>Para: {item.to_bank_account.holder_name}</S.DetailText>
                            <S.DetailText>
                                {item.to_bank_account.bank_name} - Conta: •••{item.to_bank_account.account_number.slice(-3)}
                            </S.DetailText>
                        </>
                    ) : (
                        <>
                            <S.DetailText>De: {item.from_user_bank_account.holder_name}</S.DetailText>
                            <S.DetailText>
                                {item.from_user_bank_account.bank_name} - Conta: •••{item.from_user_bank_account.account_number.slice(-3)}
                            </S.DetailText>
                        </>
                    )}
                </S.TransferDetails>


            </S.TransferItem>
        );
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
                        <S.TitleText>Painel de contas</S.TitleText>
                        <S.SectionWrapper>
                            <S.InfoText>Selecione sua conta:</S.InfoText>
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
                                <S.LabelText>R$ {accountsData[selectedAccount]?.amount?.toFixed(2)}</S.LabelText>
                            )
                            }
                        </S.BtnLine>
                        <S.SectionWrapper>
                            <S.LabelText>Informações da conta:</S.LabelText>
                            <S.ContainerInside>
                                <S.BtnText>Nome do titular: {accountsData[selectedAccount]?.holder_name}</S.BtnText>
                                <S.BtnText>Banco: {accountsData[selectedAccount]?.bank_name} - Cod: {accountsData[selectedAccount]?.bank_code}</S.BtnText>
                                <S.BtnText>Agência: {accountsData[selectedAccount]?.agency_number}-{accountsData[selectedAccount]?.agency_digit}</S.BtnText>
                                <S.BtnText>Conta: {accountsData[selectedAccount]?.account_number}-{accountsData[selectedAccount]?.account_digit}</S.BtnText>
                                <S.BtnText>Tipo de conta: {accountsData[selectedAccount]?.account_type}</S.BtnText>
                                <S.BtnText>Documento: {accountsData[selectedAccount]?.document}</S.BtnText>
                            </S.ContainerInside>
                        </S.SectionWrapper>
                        <S.SectionWrapper>
                            <S.LabelText>Transferências recentes</S.LabelText>
                            {filteredTransfers.length > 0 ? (
                                <FlatList
                                    data={filteredTransfers.slice(0, 3)} //para mostrar apenas os 3 primeiros registros da conta selecionada (mantendo a filtragem via fitro do endpoint perPage mostram os 3 registros da lista geral)
                                    renderItem={renderTransferItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={true}
                                    style={{ maxHeight: 130, width: '100%', marginTop: 5 }}
                                />
                            ) : (
                                <S.InfoText>Nenhuma transferência encontrada para esta conta.</S.InfoText>
                            )}
                        </S.SectionWrapper>


                    </S.ContainerInfo>
                )
            }
        </S.MainContainer>
    );
};