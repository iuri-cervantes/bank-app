/*
    Realiza o login do usuario
        - Possui validação dos campos ao tentar enviar a requisição
        - Disponibiliza navegação para as outras telas de autenticação (criar conta e recuperação de senha)

*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ImageBackground } from 'react-native';
import * as S from './styles';
import { useCallback, useState } from 'react';
import TextInput from '../../../components/TextInput';
import theme from '../../../styles';
import { useTheme } from '../../../hooks/useTheme';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import ChangeTheme from '../../../components/ChangeTheme';
import { apiPut } from '../../../services/api';
import { saveToken } from '../../../services/storage';


export const Login: React.FC = () => {

    const navigation = useNavigation<NavigationProp<ParamListBase>>();;
    const { currentTheme, handleChangeTheme } = useTheme();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(true);

    interface LoginResponseData {
        sucess: boolean;
        token: string;
        exp: bigint;
    }

    const handleNavigate = (destinyPage: string) => {
        navigation.navigate(destinyPage);
    }

    const validateFields = () => {
        if (email && email != '' &&
            password && password != '') {
            return true;
        }
        Alert.alert('Existem campos vazios!', "Preencha todos os campos para continuar");
        return false;
    }

    const handleLogin = useCallback(async () => {
        const validFields = validateFields();
        if (validFields) {
            setIsLoading(true);
            try {
                let res = await apiPut<LoginResponseData>('/auth/sign_in', {
                    user: {
                        email: email,
                        password: password
                    }
                });

                //salvar o token de acesso
                //console.log('token', res.token);
                await saveToken(res.token);
                navigation.reset({
                    routes: [{ name: 'AppRoutes' }],
                });
            } catch (error: any) {
                Alert.alert('Erro!', error.response.data.message || 'Erro desconhecido, tente novamente mais tarde.');
            } finally {
                setIsLoading(false);
            }
        }
    }, [email, password, isLoading, setIsLoading]);



    return (
        <S.MainContainer>
            <S.ContainerInfo>
                <ChangeTheme />
                <S.SectionWrapper>
                    <S.TitleText>Login</S.TitleText>
                    <S.InfoText>Entre para continuar</S.InfoText>
                </S.SectionWrapper>
                <S.SectionWrapper>
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
                    <S.ButtonSubmit onPress={() => handleLogin()} >
                        <S.BtnText>Entrar</S.BtnText>
                    </S.ButtonSubmit>
                </S.SectionWrapper>
                <S.SectionWrapper style={{ gap: 10 }}>
                    <S.ButtonInvisible onPress={() => handleNavigate('RecoverPassword')}>
                        <S.InfoText >Esqueceu sua senha?</S.InfoText>
                    </S.ButtonInvisible>
                    <S.ButtonInvisible onPress={() => handleNavigate('SignUp')}>
                        <S.InfoText>Crie sua conta!</S.InfoText>
                    </S.ButtonInvisible>
                </S.SectionWrapper>
            </S.ContainerInfo>
        </S.MainContainer>
    );
};