import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FieldError from '@/core/utils/FieldError';

type QueryInput<T> = {
    keys: unknown[];
    function: () => Promise<T>;
    enabled?: boolean;
}

type PagedResponse = { last: boolean };
type InfiniteQueryInput<T extends PagedResponse> = {
    keys: unknown[];
    function: (pageParam: number) => Promise<T>;
    enabled?: boolean;
}

type QueryResponse<T> =
    | { type: 'ok', data: T }
    | { type: 'notfound', data: FieldError[] }
    | { type: 'forbidden', data: FieldError[] }

const STALE_TIME = 1000 * 60 * 5;

const customQueryFn = <T>(fn: () => Promise<T>) => {
    return async (): Promise<QueryResponse<T>> => {
        try {
            const data = await fn();
            return { type: 'ok', data };
        } catch (error: any) {
            if (error.response.status === 403) return { type: 'forbidden', data: error.data };
            if (error.response.status === 404) return { type: 'notfound', data: error.data };
            throw error;
        }
    }
}

const customRetry = (failureCount: number, error: any) => {
    if (error.response.status < 500) return false;
    return failureCount < 3;
}

const usePublicQuery = <T>({ keys, function: fn, enabled = true }: QueryInput<T>) => {
    return useQuery({
        queryKey: keys,
        queryFn: fn,
        enabled,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: STALE_TIME,
        retry: 3
    })
}

const useGuardedQuery = <T>({ keys, function: fn, enabled = true }: QueryInput<T>) => {
    return useQuery({
        queryKey: keys,
        queryFn: customQueryFn(fn),
        enabled,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: STALE_TIME,
        retry: customRetry
    })
}

const useInfinitePagedQuery = <T extends PagedResponse>({ keys, function: fn, enabled = true }: InfiniteQueryInput<T>) => {
    return useInfiniteQuery({
        queryKey: keys,
        queryFn: ({ pageParam }: { pageParam: number }) => fn(pageParam),
        initialPageParam: 0,
        getNextPageParam: (page: T, _, pageParam) => page.last ? undefined : pageParam + 1,
        enabled,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false,
        retry: 3
    });
}

export {
    usePublicQuery,
    useGuardedQuery,
    useInfinitePagedQuery
}