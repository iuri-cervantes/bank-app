import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../pages/auth/Login/index';
import { RecoverPassword } from '../pages/auth/RecoverPassword/index';
import { SignUp } from '../pages/auth/SignUp/index';
import { AppRoutes } from './AppRoutes'

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => (
    <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AppRoutes" component={AppRoutes} />
    </Stack.Navigator>
);