import { AuthService } from '../auth';
import { CreateUserFormData, Page, LowDetailUser, Notification, EditUserFormData } from '@/core';
import { useAPI } from '@/data/hooks';
import { useCallback } from 'react';

export const UserService = () => {

    const { httpPost, httpPut, httpGet, httpDelete } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const createUser = useCallback(async (data: CreateUserFormData): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        try {
            return await httpPost('/users/register', output, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }, [httpPost])

    const activateUser = useCallback(async (token: string): Promise<void> => {
        try {
            return await httpGet('/users/activate', { useProgress: true, useToken: token });
        } catch (error) {
            throw error;
        }
    }, [httpGet])

    const updateUser = useCallback(async (token: string, data: EditUserFormData): Promise<LowDetailUser> => {
        const endpoint = '/users/profile';
        try {
            return await httpPut(endpoint, data, { useProgress: true, useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpPut(endpoint, { useProgress: true, useToken: newToken }));
        }
    }, [handleExpiredToken, httpPut])

    const getUser = useCallback(async (username: string): Promise<LowDetailUser> => {
        try {
            return await httpGet(`/users/${username}`);
        } catch (error) {
            throw error;
        }
    }, [httpGet])

    const getUserDisplayNameHistory = useCallback(async (username: string): Promise<string[]> => {
        try {
            return await httpGet(`/users/${username}/display-names`);
        } catch (error) {
            throw error;
        }
    }, [httpGet])

    const followUser = useCallback(async (token: string, username: string): Promise<void> => {
        const endpoint: string = `/users/${username}/follow`;
        try {
            return await httpPost(endpoint, undefined, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, { useToken: newToken }));
        }
    }, [httpPost, handleExpiredToken])

    const unfollowUser = useCallback(async (token: string, username: string): Promise<void> => {
        const endpoint: string = `/users/${username}/unfollow`;
        try {
            return await httpDelete(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, { useToken: newToken }));
        }
    }, [httpDelete, handleExpiredToken])

    const getUserFollowing = useCallback(async (token: string, username: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/following?size=9999&sort=username,asc`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    const getUserNotifications = useCallback(async (token: string, parameters?: string): Promise<Page<Notification>> => {
        const endpoint: string = `/notifications?${parameters}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    return {
        createUser,
        activateUser,
        updateUser,
        getUser,
        getUserDisplayNameHistory,
        followUser,
        unfollowUser,
        getUserFollowing,
        getUserNotifications
    }

}