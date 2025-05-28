import React from 'react';
import { Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
    TabBarContainer,
    TabButton,
    TabContent,
    TabIcon,
    TabLabel,
    FallbackIcon
} from './styles';

// Import icons
import HomeIcon from '../../assets/home.png';
import TransferIcon from '../../assets/transfer.png';
import AccountsIcon from '../../assets/accounts.png';
import HistoryIcon from '../../assets/history.png';

const { width } = Dimensions.get('window');


const ptBrLabels: Record<string, string> = {
    Home: 'Início',
    Transfer: 'Transferências',
    Accounts: 'Contas',
    History: 'Histórico'
};

const getTabIcon = (routeName: string, focused: boolean) => {
    const iconMap = {
        Home: HomeIcon,
        Transfer: TransferIcon,
        Accounts: AccountsIcon,
        History: HistoryIcon,
    };

    const iconSource = iconMap[routeName as keyof typeof iconMap];

    if (!iconSource) {
        return <FallbackIcon focused={focused}>•</FallbackIcon>;
    }

    return <TabIcon source={iconSource} focused={focused} />;
};

interface CustomTabBarProps extends BottomTabBarProps { }

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
    state,
    descriptors,
    navigation
}) => {
    return (
        <TabBarContainer>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };


                const label = ptBrLabels[route.name] || route.name;

                return (
                    <TabButton
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        activeOpacity={0.7}
                    >
                        <TabContent focused={isFocused}>
                            {getTabIcon(route.name, isFocused)}
                            <TabLabel focused={isFocused}>
                                {label}
                            </TabLabel>
                        </TabContent>
                    </TabButton>
                );
            })}
        </TabBarContainer>
    );
};

export default CustomTabBar;