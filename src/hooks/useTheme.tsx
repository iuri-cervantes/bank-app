/*
 Context de tema responsável pelos hooks de troca de tema e custumização do ThemeProvider
 - handleChangeTheme troca o tema vigente do app e tambem salva esse tema em memoria para quando o app for recarregado
 - currentTheme é o hook que retorna o tema vigente no app dark ou light
*/
import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the theme types
type Theme = 'dark' | 'light';

// Define the context value interface
interface ThemeContextValue {
    currentTheme: Theme;
    handleChangeTheme: () => Promise<void>;
    loadingTheme: boolean;
    setLoadingTheme: (loading: boolean) => void;
}

// Define the provider props interface
interface CustomThemeProviderProps {
    children: ReactNode;
}

// Create context with proper typing
const CustomThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState<Theme>('dark');
    const [loadingTheme, setLoadingTheme] = useState<boolean>(false);

    const saveThemeOnMemory = useCallback(async (selectedTheme: Theme): Promise<void> => {
        await AsyncStorage.setItem('color-theme', selectedTheme);
    }, []);

    useEffect(() => {
        async function getThemeSavedOnMemory(): Promise<void> {
            const themeOnMemory = await AsyncStorage.getItem('color-theme');

            if (!themeOnMemory) {
                setSelectedTheme('dark');
                saveThemeOnMemory('dark');
                return;
            }

            // Type guard to ensure the stored theme is valid
            if (themeOnMemory === 'dark' || themeOnMemory === 'light') {
                setSelectedTheme(themeOnMemory);
            } else {
                // Fallback to dark if invalid theme is stored
                setSelectedTheme('dark');
                saveThemeOnMemory('dark');
            }
        }

        getThemeSavedOnMemory();
    }, [saveThemeOnMemory]);

    const handleChangeTheme = useCallback(async (): Promise<void> => {
        setLoadingTheme(true);

        if (selectedTheme === 'light') {
            setSelectedTheme('dark');
            await saveThemeOnMemory('dark');
            setLoadingTheme(false);
            return;
        }

        setSelectedTheme('light');
        await saveThemeOnMemory('light');
        setLoadingTheme(false);
    }, [saveThemeOnMemory, selectedTheme]);

    return (
        <CustomThemeContext.Provider
            value={{
                currentTheme: selectedTheme,
                handleChangeTheme,
                loadingTheme,
                setLoadingTheme,
            }}
        >
            {children}
        </CustomThemeContext.Provider>
    );
};