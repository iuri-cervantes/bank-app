/*
    Componente do botão responsável pela troca de tema de cores via context useTheme
*/

import { Image } from 'react-native';
import * as S from './styles';
import MoonIcon from '../../assets/moon.png';
import SunIcon from '../../assets/sun.png';
import theme from '../../styles';
import { useTheme } from '../../hooks/useTheme';


const ChangeTheme: React.FC = () => {

    const { currentTheme, handleChangeTheme } = useTheme();

    return (
        <S.ButtonChangeTheme onPress={() => handleChangeTheme()}>
            <Image
                source={currentTheme === 'dark' ? SunIcon : MoonIcon}
                tintColor={theme[currentTheme || 'dark'].colors.loadingIndicator}
                style={{ width: 30, height: 30 }}
            />
        </S.ButtonChangeTheme>
    );
};

export default ChangeTheme;