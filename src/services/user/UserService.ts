import { CreateUserFormData, LoginUserFormData } from '@/core';
import { useAPI, useUser } from '@/data/hooks';

export const UserService = () => {

    const { setUser } = useUser();

    const { httpPost, httpGet } = useAPI();

    const createUser = async (data: CreateUserFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        try {
            return await httpPost('/users/register', output, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }

    const activateUser = async (token: string) => {
        try {
            return await httpGet('/users/activate', { useProgress: true, useToken: token });
        } catch (error) {
            throw error;
        }
    }

    const loginUserByDefault = async (data: LoginUserFormData) => {
        try {
            return await httpPost('/auth/login', data, { useProgress: true, useCredentials: true });
        } catch (error) {
            throw error;
        }
    }

    const refreshUser = async () => {
        try {
            return await httpGet("/auth/refresh", { useProgress: true, useCredentials: true })
        } catch (error) {
            throw error;
        }
    }

    const handleExpiredToken = async (error: any, func: (token: string) => Promise<any>) => {
        if (error.message === 'Token inválido.') {
            const { user, ...token } = await refreshUser();
            setUser(user, token);
            return await func(token.access_token);
        }
        else throw error;
    };

    const getUserNotifications = async (token: string) => {
        const endpoint: string = `/notifications`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    };

    return { createUser, activateUser, loginUserByDefault, refreshUser, getUserNotifications };

};