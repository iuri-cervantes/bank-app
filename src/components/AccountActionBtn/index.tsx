/*
    Componente do botão responsável pela troca de tema de cores via context useTheme
*/

import { Image } from 'react-native';
import * as S from './styles';
import TransferIcon from '../../assets/transfer.png';
import AccountsIcon from '../../assets/accounts.png';
import HistoryIcon from '../../assets/history.png';
import theme from '../../styles';
import { useTheme } from '../../hooks/useTheme';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

interface ButtonAccountActionProps {
    destiny: string,
    title: string,
    iconName: keyof typeof imageModifiers,
}

const imageModifiers = {
    transfer: TransferIcon,
    accounts: AccountsIcon,
    history: HistoryIcon,
}


const AccountActionBtn: React.FC<ButtonAccountActionProps> = ({ destiny, title, iconName }) => {

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { currentTheme, handleChangeTheme } = useTheme();

    const handleNavigate = () => {
        navigation.navigate(destiny);
    }

    return (
        <S.ButtonAccountAction onPress={() => handleNavigate()}>
            <Image
                source={imageModifiers[iconName]}
                tintColor={theme[currentTheme || 'dark'].colors.btnColor}
                style={{ width: 50, height: 50 }}
            />
            <S.InfoText>{title}</S.InfoText>
        </S.ButtonAccountAction>
    );
};

export default AccountActionBtn;