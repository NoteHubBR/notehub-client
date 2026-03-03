import { customQueryFn, customRetry } from '../utils';
import { FlameService } from './FlameService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const FlameServiceQueries = () => {

    const service = FlameService();

    const useSearchUserFlames = (token: string | null, username: string, parameters?: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['flames', username, parameters],
            queryFn: customQueryFn(() => service.searchUserFlames(token, username, parameters)),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: customRetry
        })
    }

    return {
        useSearchUserFlames
    }

}