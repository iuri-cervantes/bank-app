import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from './storage';

// Criação das instâncias do axios
const createApiInstance = (): AxiosInstance => {
    const api = axios.create({
        baseURL: 'http://10.0.2.2:3000/v1',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain',
        },
    });

    // Interceptors
    api.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );


    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                await removeToken();

            }
            return Promise.reject(error);
        }
    );

    return api;
};

// criação da instancia da api
export const api = createApiInstance();

// funções genéricas da api
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
};

export const apiPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return response.data;
};

export const apiPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await api.put(url, data, config);
    return response.data;
};

export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await api.delete(url, config);
    return response.data;
};