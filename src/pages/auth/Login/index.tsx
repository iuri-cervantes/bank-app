import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import theme from '../../../styles';


export const Login: React.FC = () => {

    const navigation = useNavigation();
    const { currentTheme, handleChangeTheme } = useTheme();

    return (
        <SafeAreaView >
            <S.MainContainer>
                <Text margin='auto' color="#000">Login</Text>
                <S.Button onPress={() => handleChangeTheme()}
                ><Text margin='auto' color="#fff">mudar tema</Text></S.Button>
                <S.Button onPress={() => navigation.navigate('RecoverPassword')}
                ><Text margin='auto' color="#fff">navigate</Text></S.Button>
                <S.Button onPress={() => navigation.navigate('SignUp')}
                ><Text margin='auto' color="#fff">SignUp</Text></S.Button>
            </S.MainContainer>

        </SafeAreaView>
    );
};