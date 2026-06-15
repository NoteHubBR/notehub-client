import { ApiClient } from '@/api';
import { createAuthService } from '../auth';
import { CreateUserFormData, Page, LowDetailUser, Notification, EditUserFormData, EmailChangeFormData, PasswordUpdateFormData, DeleteUserFormData, Subscription, Token } from '@/core';

export const createUserService = (api: ApiClient, updateToken: (token: Token) => void, withProgress?: <T>(fn: () => Promise<T>) => Promise<T>) => {

    const { handleExpiredToken } = createAuthService(api, updateToken);

    const run = withProgress ?? (<T>(fn: () => Promise<T>) => fn());

    const withRetry = async <T>(token: string | null, fn: (token: string | null) => Promise<T>): Promise<T> => {
        return run(() => fn(token)).catch((error) => handleExpiredToken(error, (newToken) => run(() => fn(newToken)), updateToken))
    }

    const createUser = async (data: CreateUserFormData): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        try {
            return await run(() => api.post('/users/register', output));
        } catch (error) {
            throw error;
        }
    }

    const activateUser = async (token: string): Promise<void> => {
        try {
            return await api.get('/users/activate', { token: token });
        } catch (error) {
            throw error;
        }
    }

    const updateUser = (token: string, data: EditUserFormData): Promise<LowDetailUser> => {
        const endpoint = '/users/profile';
        return withRetry(token, (token) => api.put(endpoint, data, { token: token }));
    }

    const updateUserEmail = async (token: string, data: EmailChangeFormData): Promise<void> => {
        const endpoint = '/users/change-email';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatEmail, ...output } = data;
        try {
            return await api.patch(endpoint, output, { token: token });
        } catch (error) {
            throw error;
        }
    }

    const updateUserPassword = async (token: string, data: PasswordUpdateFormData): Promise<void> => {
        const endpoint = '/users/change-password';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        try {
            return await api.patch(endpoint, output, { token: token });
        } catch (error) {
            throw error;
        }
    }

    const updateUserVisibility = (token: string): Promise<void> => {
        const endpoint = '/users/profile/visibility';
        return withRetry(token, (token) => api.patch(endpoint, undefined, { token: token }));
    }

    const getUser = async (username: string): Promise<LowDetailUser> => {
        try {
            return await api.get(`/users/${username}`);
        } catch (error) {
            throw error;
        }
    }

    const getUserDisplayNameHistory = async (username: string): Promise<string[]> => {
        try {
            return await api.get(`/users/${username}/display-names`);
        } catch (error) {
            throw error;
        }
    }

    const followUser = async (token: string, username: string): Promise<void> => {
        const endpoint: string = `/users/${username}/follow`;
        return withRetry(token, (token) => api.post(endpoint, undefined, { token: token }));
    }

    const unfollowUser = async (token: string, username: string): Promise<void> => {
        const endpoint: string = `/users/${username}/unfollow`;
        return withRetry(token, (token) => api.delete(endpoint, undefined, { token: token }));
    }

    const searchUserFollowing = async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/following?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const searchUserFollowers = async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/followers?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const getUserNotifications = async (token: string, parameters?: string): Promise<Page<Notification>> => {
        const endpoint: string = `/notifications?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const searchUsers = async (parameters?: string): Promise<Page<LowDetailUser>> => {
        try {
            return await api.get(`/users?${parameters}`);
        } catch (error) {
            throw error;
        }
    }

    const getUserSubscriptions = async (token: string): Promise<Subscription[]> => {
        const endpoint: string = '/users/subscriptions';
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const enableSubscription = async (token: string, subscription: Subscription): Promise<void> => {
        const endpoint = `/users/subscriptions/${subscription}`;
        return withRetry(token, (token) => api.post(endpoint, undefined, { token: token }));
    }

    const disableSubscription = async (token: string, subscription: Subscription): Promise<void> => {
        const endpoint = `/users/subscriptions/${subscription}`;
        return withRetry(token, (token) => api.delete(endpoint, undefined, { token: token }));
    }

    const deleteUser = async (token: string, data: DeleteUserFormData) => {
        const endpoint = '/users/delete';
        return withRetry(token, (token) => api.delete(endpoint, data, { token: token }));
    }

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

export type UserService = ReturnType<typeof createUserService>;