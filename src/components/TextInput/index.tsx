import { Image, ImageStyle, TextInputProps } from 'react-native';
import * as S from './styles';
import ViewIcon from '../../assets/view.png';
import HideIcon from '../../assets/hide.png';
import theme from '../../styles';
import { useTheme } from '../../hooks/useTheme';

interface TextInputComponentProps extends TextInputProps {
    label: string;
    isPassword?: boolean;
    visiblePassword?: boolean;
    setVisiblePassword?: (visible: boolean) => void;
}

const TextInput: React.FC<TextInputComponentProps> = ({
    label,
    isPassword = false,
    visiblePassword = false,
    setVisiblePassword = () => { },
    ...props
}: TextInputComponentProps) => {
    const { currentTheme } = useTheme();

    const imageStyle: ImageStyle = {
        width: 20,
        height: 20,
    };

    return (
        <S.Wrapper>
            <S.Label>{label}</S.Label>
            <S.InputWrapper>
                <S.TextInput {...props} />
                {isPassword && (
                    <S.ButtonVisible onPress={() => setVisiblePassword(!visiblePassword)}>
                        <Image
                            source={visiblePassword ? ViewIcon : HideIcon}
                            tintColor={theme[currentTheme || 'dark'].colors.inputText}
                            style={imageStyle}
                        />
                    </S.ButtonVisible>
                )}
            </S.InputWrapper>
        </S.Wrapper>
    );
};

export default TextInput;