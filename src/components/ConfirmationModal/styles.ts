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
  cancel?: boolean;
  width?: string;
}


export const FullScreenModal = styled.View`
  height: 100%;
  background: rgba(8, 8, 8, 0.8);
`;

export const ModalView = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    background-color: ${theme.colors.mainBg};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    width: 100%;
    position: absolute;
    bottom: 0px;
  `}
`;

export const ModalContent = styled.View`
  padding: 0px 15px 30px 15px;
`;

export const Header = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    background: ${theme.colors.mainBg};
    border-bottom-color: ${theme.colors.btnColor};
  `}
  padding: 20px 0px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;
`;

export const InfoText = styled.Text<StyledProps>`
    ${({ theme }: StyledProps) => css`
        color: ${theme.colors.mainLabelColor};
        font-size: 15px;
        margin: 10px;
        width:80%;
    `}
`;

export const LabelText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.mainLabelColor};
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  `}
`;

export const Line = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const BtnLine = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 4px;
`;

export const BtnText = styled.Text<StyledProps>`
    ${({ theme, cancel }: StyledProps) => css`
        color: ${cancel ? theme.colors.infoLabelColor : theme.colors.btnLabel};
        font-size: 16px;
    `}
`;

export const TitleText = styled.Text<StyledProps>`
    ${({ theme }: StyledProps) => css`
        color: ${theme.colors.mainLabelColor};
        font-size: 20px;
        font-weight: bold;
    `}
`;

export const ButtonSubmit = styled.TouchableOpacity<StyledProps>`
  ${({ theme }: StyledProps) => css`
    background-color: ${theme.colors.btnColor};
    padding: 10px;
    align-items: center;
    justify-content: center;
    width: 40%;
    border-radius: 8px;
    margin: 20px 0px 20px 0px;
  `}
`;

export const ButtonCancel = styled.TouchableOpacity<StyledProps>`
  ${({ theme, width }: StyledProps) => css`
    background-color: ${theme.colors.mainBg};  
    border: 1px solid;
    border-color: ${theme.colors.btnColor};
    padding: 10px;
    align-items: center;
    justify-content: center;
    width: ${width ? width : '40%'};
    border-radius: 8px;
    margin: 20px 0px 20px 0px;
    ${width && `margin: 5px 0px 0px 0px;`}
  `}
`;

export const ButtonContainer = styled.View<StyledProps>`
  flex-direction: row;
  justify-content: space-evenly;
  ${({ theme }: StyledProps) => css`
    border-top-color: ${theme.colors.btnColor};
    border-top-width: 1px;
  `}
`;

export const FilterBtn = styled.TouchableOpacity`
`;