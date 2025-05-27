import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    TOKEN: '@app:token',
} as const;

// Manipulação do token
export const saveToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(KEYS.TOKEN, token);
    } catch (error) {
        console.error('Erro ao salvar token:', error);
        throw error;
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(KEYS.TOKEN);
    } catch (error) {
        console.error('Erro ao recuperar token:', error);
        return null;
    }
};

export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(KEYS.TOKEN);
    } catch (error) {
        console.error('Erro ao remover token:', error);
        throw error;
    }
};

