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
    focused?: boolean;
}

export const TabBarContainer = styled.View`
${({ theme }: StyledProps) => css`
    flex-direction: row;
    background-color: ${theme.colors.mainBg};
    border-top-width: 1px;
    border-top-color: ${theme.colors.mainBg};
    padding-bottom: 34px;
    padding-top: 8px;
    shadow-color: #000;
    shadow-offset: 0px -2px;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
    elevation: 8;
  `}
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 8px;
`;

export const TabContent = styled.View<StyledProps>`
  align-items: center;
  justify-content: center;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 12px;
  min-height: 50px;
  background-color: ${({ theme, focused }: StyledProps) => focused ? `${theme.colors.btnColor}` : 'transparent'};
  transform: ${({ theme, focused }: StyledProps) => focused ? 'scale(1.05)' : 'scale(1)'};
`;

export const TabIcon = styled.Image<StyledProps>`
  width: 24px;
  height: 24px;
  tint-color: ${({ theme, focused }: StyledProps) => focused ? `#fff` : `${theme.colors.mainLabelColor}`};
  margin-bottom: 2px;
`;

export const TabLabel = styled.Text<StyledProps>`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme, focused }: StyledProps) => focused ? `#fff` : `${theme.colors.mainLabelColor}`};
`;

export const FallbackIcon = styled.Text<StyledProps>`
    color: ${({ theme, focused }: StyledProps) => focused ? `#fff` : `${theme.colors.mainLabelColor}`};
`;