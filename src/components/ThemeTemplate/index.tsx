/*
 Componente do styled components que extende o context de tema para permitir a troca de temas
*/
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../styles';
import { useTheme } from '../../hooks/useTheme';


interface ThemeTemplateProps {
    children: ReactNode;
}

const ThemeTemplate: React.FC<ThemeTemplateProps> = ({ children }) => {
    const { currentTheme } = useTheme();

    return (
        <ThemeProvider theme={theme[currentTheme || 'dark']}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeTemplate;