import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Alert } from 'react-native';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import theme from '../../../styles';
import ChangeTheme from '../../../components/ChangeTheme';
import TextInput from '../../../components/TextInput';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { apiPost } from '../../../services/api';


export const SignUp: React.FC = () => {

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { currentTheme, handleChangeTheme } = useTheme();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [resentEmail, setResentEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(true);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(true);
    const [chronoTime, setChronoTime] = useState(0);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const handleNavigate = (destinyPage: string) => {
        navigation.navigate(destinyPage);
    }

    const handleOpenConfirmModal = () => {
        setIsConfirmModalVisible(true);
    }

    const handleCloseConfirmModal = () => {
        setIsConfirmModalVisible(false);
    }

    useEffect(() => {
        if (chronoTime > 0) {
            const interval = setInterval(() => {
                setChronoTime(chronoTime => chronoTime - 1)
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [chronoTime]);


    const validateFields = () => {
        if (email && email != '' &&
            password && password != '' &&
            confirmPassword && confirmPassword.length != 0) {
            //teste para verificação se as 2 senhas são iguais
            if (confirmPassword === password) {
                return true;
            }
            Alert.alert('Senhas diferentes!', "As duas senhas devem ser iguais!");
            return false;
        }
        Alert.alert('Existem campos vazios!', "Preencha todos os campos para continuar");
        return false;
    }

    const clearFields = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }


    const handleResendEmail = useCallback(async () => {
        const validEmail = resentEmail && resentEmail != '';
        if (validEmail) {
            setIsLoading(true);
            try {
                let res = await apiPost<{ message: string }>('/auth/resend_credential_email', {
                    user: {
                        email: resentEmail,
                    }
                });

                setResentEmail('');
                setChronoTime(60);
                handleCloseConfirmModal();
                Alert.alert('E-mail reenviado!', res.message);
            } catch (error: any) {
                console.log(error.response.data.error)
                Alert.alert('Erro!', error.response.data.error || 'Erro desconhecido, tente novamente mais tarde.');
            } finally {
                setIsLoading(false);
            }
        } else {
            Alert.alert('Atenção!', 'Digite o e-mail para reenviar.');
        }
    }, [resentEmail, isConfirmModalVisible, isLoading, setIsLoading]);

    const handleSignUp = useCallback(async () => {
        const validFields = validateFields();
        if (validFields) {
            setIsLoading(true);
            try {
                let res = await apiPost<{ message: string }>('/auth/sign_up', {
                    user: {
                        name: userName,
                        email: email,
                        password: password
                    }
                });

                clearFields();
                setResentEmail(email);
                setChronoTime(60);
                Alert.alert('Usuário Cadastrado!', res.message);
            } catch (error: any) {
                console.log('erro:', error)
                Alert.alert('Erro!', error.response.data.message || 'Erro desconhecido, tente novamente mais tarde.');
            } finally {
                setIsLoading(false);
            }
        }
    }, [userName, email, password, confirmPassword, isLoading, setIsLoading]);

    return (

        <>
            <S.MainContainer>
                <S.ContainerInfo>
                    <ChangeTheme />
                    <S.SectionWrapper>
                        <S.TitleText>Cadastre-se</S.TitleText>
                        <S.InfoText>Insira suas informações</S.InfoText>
                    </S.SectionWrapper>
                    <S.SectionWrapper>
                        <TextInput
                            label="NOME DE USUÁRIO"
                            value={userName}
                            autoCapitalize='none'
                            placeholder="Insira seu nome de usuário"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors
                                    .placeholder
                            }
                            onChangeText={text => setUserName(text)}
                            returnKeyType="done"
                        />
                        <TextInput
                            label="E-MAIL"
                            value={email}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholder="Insira seu e-mail"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors
                                    .placeholder
                            }
                            onChangeText={text => setEmail(text)}
                            returnKeyType="done"
                        />
                        <TextInput
                            label="SENHA"
                            value={password}
                            autoCapitalize='none'
                            isPassword={true}
                            secureTextEntry={visiblePassword}
                            visiblePassword={visiblePassword}
                            setVisiblePassword={setVisiblePassword}
                            placeholder="Insira sua senha"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors
                                    .placeholder
                            }
                            onChangeText={text => setPassword(text)}
                            returnKeyType="done"
                        />

                        <TextInput
                            label="CONFIRMAR SENHA"
                            value={confirmPassword}
                            autoCapitalize='none'
                            isPassword={true}
                            secureTextEntry={visibleConfirmPassword}
                            visiblePassword={visibleConfirmPassword}
                            setVisiblePassword={setVisibleConfirmPassword}
                            placeholder="Insira sua senha"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors
                                    .placeholder
                            }
                            onChangeText={text => setConfirmPassword(text)}
                            returnKeyType="done"
                        />
                        <S.ButtonSubmit onPress={() => handleSignUp()} >
                            <S.BtnText>Cadastrar</S.BtnText>
                        </S.ButtonSubmit>
                    </S.SectionWrapper>
                    <S.SectionWrapper style={{ gap: 10 }}>
                        <S.ButtonInvisible onPress={() => handleNavigate('Login')}>
                            <S.InfoText>Ja possui conta? Entrar.</S.InfoText>
                        </S.ButtonInvisible>
                    </S.SectionWrapper>
                </S.ContainerInfo>
            </S.MainContainer>
            {/*<ConfirmationModal
                email={resentEmail}
                setEmail={setResentEmail}
                isModalVisible={isConfirmModalVisible}
                setIsModalVisible={setIsConfirmModalVisible}
                handleExecuteAction={handleResendEmail}
                        />*/}
        </>
    );
};