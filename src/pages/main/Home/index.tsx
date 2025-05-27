import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, Image } from 'react-native';
import * as S from './styles';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { removeToken } from '../../../services/storage';
import theme from '../../../styles';
import { useTheme } from '../../../hooks/useTheme';
import ChangeTheme from '../../../components/ChangeTheme';
import LogOffIcon from '../../../assets/turn-off.png';
import AccountActionBtn from '../../../components/AccountActionBtn';


export const Home: React.FC = () => {

    const { currentTheme, handleChangeTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState('Iuri');

    const navigation = useNavigation<NavigationProp<ParamListBase>>();;
    const handleLogout = async () => {
        await removeToken();
        navigation.reset({
            routes: [{ name: 'Login' }],
        });
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



    return (
        <S.MainContainer>
            {isLoading ?
                (
                    <S.ContainerInfo>
                        <S.InfoText>Carregando suas informações.</S.InfoText>
                        <S.LoadingIcon size='large' color={theme[currentTheme || 'dark'].colors.loadingIndicator} />
                    </S.ContainerInfo>
                ) :
                userName && userName != '' &&
                (
                    <S.ContainerInfo>
                        <ChangeTheme />
                        <S.LogOffBtn onPress={() => handleLogoutChoice()}>
                            <Image
                                source={LogOffIcon}
                                tintColor={theme[currentTheme || 'dark'].colors.loadingIndicator}
                                style={{ width: 30, height: 30 }}
                            />
                        </S.LogOffBtn>
                        <S.InfoText>Olá {userName}!</S.InfoText>
                        <S.InfoText>Seu saldo: R$10,00</S.InfoText>
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