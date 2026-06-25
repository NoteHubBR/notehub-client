import { ApiClient } from '@/api';
import { CreateUserFormData, Page, LowDetailUser, Notification, EditUserFormData, EmailChangeFormData, PasswordUpdateFormData, DeleteUserFormData, Subscription } from '@/core';
import { WithRetry } from '../auth';

export const createUserService = (publicApi: ApiClient, privateApi: ApiClient, withRetry: WithRetry) => {

    const createUser = async (data: CreateUserFormData): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        return await publicApi.post('/users/register', output);
    }

    const activateUser = async (token: string): Promise<void> => {
        return await privateApi.get('/users/activate', { token: token });
    }

    const updateUser = (token: string, data: EditUserFormData): Promise<LowDetailUser> => {
        const endpoint = '/users/profile';
        return withRetry(token, (token) => privateApi.put(endpoint, data, { token: token }));
    }

    const updateUserEmail = async (token: string, data: EmailChangeFormData): Promise<void> => {
        const endpoint = '/users/change-email';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatEmail, ...output } = data;
        return await privateApi.patch(endpoint, output, { token: token });
    }

    const updateUserPassword = async (token: string, data: PasswordUpdateFormData): Promise<void> => {
        const endpoint = '/users/change-password';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        return await privateApi.patch(endpoint, output, { token: token });
    }

    const updateUserVisibility = (token: string): Promise<void> => {
        const endpoint = '/users/profile/visibility';
        return withRetry(token, (token) => privateApi.patch(endpoint, undefined, { token: token }));
    }

    const getUser = async (username: string): Promise<LowDetailUser> => {
        return await publicApi.get(`/users/${username}`);
    }

    const getUserDisplayNameHistory = async (username: string): Promise<string[]> => {
        return await publicApi.get(`/users/${username}/display-names`);
    }

    const followUser = async (token: string, username: string): Promise<void> => {
        const endpoint: string = `/users/${username}/follow`;
        return withRetry(token, (token) => privateApi.post(endpoint, undefined, { token: token }));
    }

    const unfollowUser = async (token: string, username: string): Promise<void> => {
        const endpoint: string = `/users/${username}/unfollow`;
        return withRetry(token, (token) => privateApi.delete(endpoint, undefined, { token: token }));
    }

    const searchUserFollowing = async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/following?${parameters}`;
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const searchUserFollowers = async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailUser>> => {
        const endpoint: string = `/users/${username}/followers?${parameters}`;
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const getUserNotifications = async (token: string, parameters?: string): Promise<Page<Notification>> => {
        const endpoint: string = `/notifications?${parameters}`;
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const searchUsers = async (parameters?: string): Promise<Page<LowDetailUser>> => {
        return await publicApi.get(`/users?${parameters}`);
    }

    const getUserSubscriptions = async (token: string): Promise<Subscription[]> => {
        const endpoint: string = '/users/subscriptions';
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const enableSubscription = async (token: string, subscription: Subscription): Promise<void> => {
        const endpoint = `/users/subscriptions/${subscription}`;
        return withRetry(token, (token) => privateApi.post(endpoint, undefined, { token: token }));
    }

    const disableSubscription = async (token: string, subscription: Subscription): Promise<void> => {
        const endpoint = `/users/subscriptions/${subscription}`;
        return withRetry(token, (token) => privateApi.delete(endpoint, undefined, { token: token }));
    }

    const deleteUser = async (token: string, data: DeleteUserFormData) => {
        const endpoint = '/users/delete';
        return withRetry(token, (token) => privateApi.delete(endpoint, data, { token: token }));
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