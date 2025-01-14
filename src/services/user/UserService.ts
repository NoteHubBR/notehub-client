import { CreateUserFormData, LoginUserFormData, Page, User } from '@/core';
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

    const loginUserByDefault = async (data: LoginUserFormData): Promise<{ access_token: string, user: User }> => {
        try {
            return await httpPost('/auth/login', data, { useProgress: true, useCredentials: true });
        } catch (error) {
            throw error;
        }
    }

    const refreshUser = async (): Promise<{ access_token: string, user: User }> => {
        try {
            return await httpGet("/auth/refresh", { useProgress: true, useCredentials: true })
        } catch (error) {
            throw error;
        }
    }

    const handleExpiredToken = async (error: any, func: (token: string) => Promise<any>) => {
        if (error.message === 'Token inválido.') {
            const { access_token, user } = await refreshUser();
            setUser(access_token, user);
            return await func(access_token);
        }
        else throw error;
    };

    const getUserFollowing = async (token: string, username: string): Promise<Page> => {
        const endpoint: string = `/users/${username}/following`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    };

    return { createUser, activateUser, loginUserByDefault, refreshUser, getUserFollowing };

};