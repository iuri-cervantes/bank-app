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
}



export const ButtonAccountAction = styled.TouchableOpacity<StyledProps>`
  ${({ theme }: StyledProps) => css`
    border-radius: 15px;    
    padding: 10px;
    width: 32%;
    height: 120px;
    border: 1px solid ${theme.colors.btnColor};
    align-items: center;
    justify-content: center;
  `}
`;

export const InfoText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.infoLabelColor};
    font-size: 16px;
    margin-top: 10px;
  `}
`;