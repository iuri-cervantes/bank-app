import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';


export const RecoverPassword: React.FC = () => {

    const navigation = useNavigation();
    const { isAuthenticated } = useAuth();

    return (
        <SafeAreaView >
            <S.MainContainer>
                <Text margin='auto' color="#000">recover</Text>
                <S.Button onPress={() => navigation.navigate("AppRoutes")}
                ><Text margin='auto' color="#fff">entrar</Text></S.Button>
            </S.MainContainer>

        </SafeAreaView>
    );
};