import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';


export const Home: React.FC = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView >
            <S.MainContainer>
                <Text margin='auto' color="#000">logado</Text>
                <S.Button onPress={() => {
                    navigation.reset({
                        routes: [{ name: 'Login' }],
                    });
                }}
                ><Text margin='auto' color="#fff">sair</Text></S.Button>
            </S.MainContainer>

        </SafeAreaView>
    );
};