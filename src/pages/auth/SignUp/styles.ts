import styled, { css } from 'styled-components/native';

// Define a interface do tema
interface Theme {
  colors: {
    mainBg: string,
    mainLabelColor: string,
    btnLabel: string,
    infoLabelColor: string,
    btnColor: string,
    loadingIndicator: string,
    inputContainer: string,
    inputText: string,
    placeholder: string,
  };
}

// Define interface do styled props
interface StyledProps {
  theme: Theme;
}

export const MainContainer = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.btnColor}
  `}
`;



export const ContainerInfo = styled.KeyboardAvoidingView<StyledProps>`
  ${({ theme }: StyledProps) => css`
    border-radius: 20px;
    width: 85%;
    background-color: ${theme.colors.mainBg};
    padding: 40px;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  `}
`;

export const SectionWrapper = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    align-items: center;
    justify-content: center;
    width: 100%;
  `}
`;

export const LoadingIcon = styled.ActivityIndicator<StyledProps>``;

export const InfoText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.infoLabelColor};
    font-size: 16px;
  `}
`;

export const BtnText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.btnLabel};
    font-size: 16px;
  `}
`;

export const TitleText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.mainLabelColor};
    font-size: 40px;
    font-weight: bold;
  `}
`;

export const ButtonInvisible = styled.TouchableOpacity<StyledProps>`
  ${({ theme }: StyledProps) => css`
    margin-bottom: 20px;
  `}
`;

export const ButtonSubmit = styled.TouchableOpacity<StyledProps>`
  ${({ theme }: StyledProps) => css`
    background-color: ${theme.colors.btnColor};
    padding: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 8px;
    margin: 20px 0px 40px 0px;
  `}
`;
