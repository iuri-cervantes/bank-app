import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRoutes } from './AuthRoutes';
import { useAuth } from '../hooks/useAuth';
import ThemeTemplate from '../components/ThemeTemplate';
import { CustomThemeProvider } from '../hooks/useTheme';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Retornar componente de loading
        return null;
    }

    return (
        <NavigationContainer>
            <CustomThemeProvider>
                <ThemeTemplate>
                    <AuthRoutes />
                </ThemeTemplate>
            </CustomThemeProvider>
        </NavigationContainer>
    );
};