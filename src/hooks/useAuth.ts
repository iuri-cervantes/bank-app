import { useState, useEffect, useCallback } from 'react';
import { getToken, removeToken, saveToken } from '../services/storage';
import { apiPost } from '../services/api';



interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);

    const checkAuthStatus = useCallback(async () => {
        try {
            const token = await getToken();

            if (token) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Erro de autenticação:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        setLoginLoading(true);
        try {
            const response = await apiPost<LoginResponse>('/auth/login', credentials);

            await saveToken(response.token);

            setIsAuthenticated(true);

            return response;
        } catch (error) {
            console.error('Erro de login:', error);
            throw error;
        } finally {
            setLoginLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await removeToken();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Erro de logout:', error);
        }
    }, []);

    const register = useCallback(async (userData: any) => {
        setLoginLoading(true);
        try {
            const response = await apiPost<LoginResponse>('/auth/register', userData);

            await saveToken(response.token);

            setIsAuthenticated(true);

            return response;
        } catch (error) {
            console.error('Erro no registro de usuário', error);
            throw error;
        } finally {
            setLoginLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return {
        isAuthenticated,
        loading,
        loginLoading,
        login,
        logout,
        register,
        checkAuthStatus,
    };
};