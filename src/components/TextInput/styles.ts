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


export const Wrapper = styled.View<StyledProps>`
    ${({ theme }: StyledProps) => css`
        width: 100%;
    `}
`;

export const Label = styled.Text<StyledProps>`
    ${({ theme }: StyledProps) => css`
        gap: 10px;
        width: 100%;
        padding: 10px;
        color: ${theme.colors.mainLabelColor};
    `}
`;

export const InputWrapper = styled.View<StyledProps>`
    ${({ theme }: StyledProps) => css`
        width: 100%;
        padding: 10px;
        background-color: ${theme.colors.inputContainer};
        flex-direction: row;
        align-items: center;
        border-radius: 8px;
    `}
`;

export const TextInput = styled.TextInput<StyledProps>`
  ${({ theme }: StyledProps) => css`
    font-size: 16px;
    align-self: center;
    color: ${theme.colors.inputText};
  `}
`;

export const ButtonVisible = styled.TouchableOpacity<StyledProps>`
  ${({ theme }: StyledProps) => css`
    position: absolute;
    right: 10px;
  `}
`;