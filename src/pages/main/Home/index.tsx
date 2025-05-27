import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import * as S from './styles';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { removeToken } from '../../../services/storage';


export const Home: React.FC = () => {

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
        <SafeAreaView >
            <S.MainContainer>
                <Text margin='auto' color="#000">logado</Text>
                <S.Button onPress={() => handleLogoutChoice()}
                ><Text margin='auto' color="#fff">sair</Text></S.Button>
            </S.MainContainer>

        </SafeAreaView>
    );
};