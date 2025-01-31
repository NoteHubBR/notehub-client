import { AuthService } from '../auth';
import { CreateUserFormData, Page, LowDetailUser, Notification } from '@/core';
import { useAPI } from '@/data/hooks';

export const UserService = () => {

    const { httpPost, httpGet } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

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

    const getUserFollowing = async (token: string, username: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/following?size=9999&sort=username,asc`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }

    const getUserNotifications = async (token: string, parameters?: string): Promise<Page<Notification>> => {
        const endpoint: string = `/notifications?${parameters}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }

    return { createUser, activateUser, getUserFollowing, getUserNotifications }

}