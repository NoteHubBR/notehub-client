import { customQueryFn, customRetry } from '../utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UserService } from './UserService';

export const UserServiceQueries = () => {

    const service = UserService();

    // searchUserFollowing searchUserFollowers

    const useGetUser = (username: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['user', username],
            queryFn: customQueryFn(() => service.getUser(username)),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: customRetry
        })
    }

    const useGetUserDisplayNameHistory = (username: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['getUserDisplayNameHistory', username],
            queryFn: customQueryFn(() => service.getUserDisplayNameHistory(username)),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: customRetry
        })
    }

    const useSearchUsers = (parameters?: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['searchUsers', parameters],
            queryFn: () => service.searchUsers(parameters),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: 3
        })
    }

    return {
        useGetUser,
        useGetUserDisplayNameHistory,
        useSearchUsers
    }

}