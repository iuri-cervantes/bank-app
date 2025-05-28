import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/main/Home';
import { History } from '../pages/main/History';
import { Transfer } from '../pages/main/Transfer';
import { Accounts } from '../pages/main/Accounts';

import { RootStackParamList, TabParamList } from '../types/navigation';
import CustomTabBar from '../components/CustomTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props: any) => <CustomTabBar {...props} />}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Transfer" component={Transfer} />
        <Tab.Screen name="Accounts" component={Accounts} />
        <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
);

export const AppRoutes: React.FC = () => (
    <Stack.Navigator initialRouteName='HomeStack'
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeStack" component={TabNavigator} />
    </Stack.Navigator>
);