import { CreateUserFormData, LoginUserFormData } from '@/core';
import { useAPI } from '@/data/hooks';

export const UserService = () => {

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
            return await httpGet("/auth/refresh", { useCredentials: true })
        } catch (error) {
            throw error;
        }
    }

    return { createUser, activateUser, loginUserByDefault, refreshUser };

};