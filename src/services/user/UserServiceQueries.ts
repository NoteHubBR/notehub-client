import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UserService } from './UserService';

export const UserServiceQueries = () => {

    const service = UserService();

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
        useSearchUsers
    }

}