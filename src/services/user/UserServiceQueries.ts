import { useGuardedQuery, usePublicQuery } from '../utils';
import { UserService } from './UserService';

export const UserServiceQueries = () => {

    const service = UserService();

    const useGetUser = (username: string, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['user', username],
            function: () => service.getUser(username),
            enabled: enabled
        })
    }

    const useGetUserDisplayNameHistory = (username: string, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['history', username],
            function: () => service.getUserDisplayNameHistory(username),
            enabled: enabled
        })
    }

    const useSearchUsers = (parameters?: string, enabled: boolean = true) => {
        return usePublicQuery({
            keys: ['searchUsers', parameters],
            function: () => service.searchUsers(parameters),
            enabled: enabled
        })
    }

    const useSearchUserFollowing = (token: string | null, username: string, parameters?: string, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['following', token, username, parameters],
            function: () => service.searchUserFollowing(token, username, parameters),
            enabled: enabled
        })
    }

    const useSearchUserFollowers = (token: string | null, username: string, parameters?: string, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['followers', token, username, parameters],
            function: () => service.searchUserFollowers(token, username, parameters),
            enabled: enabled
        })
    }

    return {
        useGetUser,
        useGetUserDisplayNameHistory,
        useSearchUsers,
        useSearchUserFollowing,
        useSearchUserFollowers
    }

}