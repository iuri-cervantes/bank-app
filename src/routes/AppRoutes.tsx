import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/main/Home';
import { RootStackParamList, TabParamList } from '../types/navigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
);

export const AppRoutes: React.FC = () => (
    <Stack.Navigator initialRouteName='HomeStack'
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeStack" component={TabNavigator} />
    </Stack.Navigator>
);