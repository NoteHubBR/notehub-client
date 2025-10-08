import { AuthService } from '../auth';
import { CreateUserFormData, Page, LowDetailUser, Notification, EditUserFormData, EmailChangeFormData, PasswordUpdateFormData, DeleteUserFormData, Subscription } from '@/core';
import { useAPI } from '@/data/hooks';
import { useCallback } from 'react';

export const UserService = () => {

    const { httpPost, httpPut, httpPatch, httpGet, httpDelete } = useAPI();

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
            return handleExpiredToken(error, (newToken) => httpPut(endpoint, data, { useProgress: true, useToken: newToken }));
        }
    }, [handleExpiredToken, httpPut])

    const updateUserEmail = useCallback(async (token: string, data: EmailChangeFormData): Promise<void> => {
        const endpoint = '/users/change-email';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatEmail, ...output } = data;
        try {
            return await httpPatch(endpoint, output, { useProgress: true, useToken: token });
        } catch (error) {
            throw error;
        }
    }, [httpPatch])

    const updateUserPassword = useCallback(async (token: string, data: PasswordUpdateFormData): Promise<void> => {
        const endpoint = '/users/change-password';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        try {
            return await httpPatch(endpoint, output, { useProgress: true, useToken: token });
        } catch (error) {
            throw error;
        }
    }, [httpPatch])

    const updateUserVisibility = useCallback(async (token: string): Promise<void> => {
        const endpoint = '/users/profile/visibility';
        try {
            return await httpPatch(endpoint, undefined, { useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpPatch(endpoint, undefined, { useToken: newToken }));
        }
    }, [handleExpiredToken, httpPatch])

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
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, undefined, { useToken: newToken }));
        }
    }, [httpPost, handleExpiredToken])

    const unfollowUser = useCallback(async (token: string, username: string): Promise<void> => {
        const endpoint: string = `/users/${username}/unfollow`;
        try {
            return await httpDelete(endpoint, undefined, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, undefined, { useToken: newToken }));
        }
    }, [httpDelete, handleExpiredToken])

    const searchUserFollowing = useCallback(async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/following?${parameters}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    const searchUserFollowers = useCallback(async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/followers?${parameters}`;
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

    const searchUsers = useCallback(async (parameters?: string): Promise<Page<LowDetailUser>> => {
        try {
            return await httpGet(`/users?${parameters}`);
        } catch (error) {
            throw error;
        }
    }, [httpGet])

    const getUserSubscriptions = useCallback(async (token: string): Promise<Subscription[]> => {
        const endpoint: string = '/users/subscriptions';
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    const enableSubscription = useCallback(async (token: string, subscription: Subscription): Promise<void> => {
        const endpoint = `/users/subscriptions/${subscription}`;
        try {
            return await httpPost(endpoint, undefined, { useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, undefined, { useToken: newToken }));
        }
    }, [httpPost, handleExpiredToken])

    const disableSubscription = useCallback(async (token: string, subscription: Subscription): Promise<void> => {
        const endpoint = `/users/subscriptions/${subscription}`;
        try {
            return await httpDelete(endpoint, undefined, { useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, undefined, { useToken: newToken }));
        }
    }, [httpDelete, handleExpiredToken])

    const deleteUser = useCallback(async (token: string, data: DeleteUserFormData) => {
        const endpoint = '/users/delete';
        try {
            return await httpDelete(endpoint, data, { useProgress: true, useToken: token })
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, data, { useProgress: true, useToken: newToken }));
        }
    }, [httpDelete, handleExpiredToken])

    return {
        createUser,
        activateUser,
        updateUser,
        updateUserEmail,
        updateUserPassword,
        updateUserVisibility,
        getUser,
        getUserDisplayNameHistory,
        followUser,
        unfollowUser,
        searchUserFollowing,
        searchUserFollowers,
        getUserNotifications,
        searchUsers,
        getUserSubscriptions,
        enableSubscription,
        disableSubscription,
        deleteUser
    }

}