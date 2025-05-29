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
  width?: string;
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
    padding: 70px 30px 40px 30px;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  `}
`;

export const SectionWrapper = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    align-items: flex-start;
    justify-content: center;
    width: 100%;
  `}
`;

export const LoadingIcon = styled.ActivityIndicator<StyledProps>``;

export const InfoText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.mainLabelColor};
    font-size: 16px;
  `}
`;

export const LabelText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.mainLabelColor};
    font-size: 20px;
    font-weight: bold;
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
  ${({ theme }: StyledProps) => css``}
`;

export const ButtonSubmit = styled.TouchableOpacity<StyledProps>`
  ${({ theme, width }: StyledProps) => css`
    background-color: ${theme.colors.btnColor};  
    border: 1px solid;
    border-color: ${theme.colors.btnColor};
    padding: 10px;
    align-items: center;
    justify-content: center;
    width: ${width ? width : '40%'};
    border-radius: 8px;
    margin: 20px 0px 0px 0px;
    ${width && `margin: 5px 0px 20px 0px;`}
  `}
`;

export const LogOffBtn = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    top: 20px;
`;

export const OclusionBtn = styled.TouchableOpacity`
    position: absolute;
    right: 60px;
    top: 20px;
`;


export const BtnLine = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;