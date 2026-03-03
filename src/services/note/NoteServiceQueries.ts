import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { NoteService } from './NoteService';
import { UUID } from 'crypto';

type CustomResponse =
    | { type: 'ok', data: any }
    | { type: 'notfound', data: any }
    | { type: 'forbidden', data: any }

export const NoteServiceQueries = () => {

    const service = NoteService();

    const customQueryFn = (fn: () => Promise<any>) => {
        return async (): Promise<CustomResponse> => {
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

    const smartRetry = (failureCount: number, error: any) => {
        if (error.response.status < 500) return false;
        return failureCount < 3;
    }

    const useGetFeed = (token: string, enabled: boolean = true) => {
        return useInfiniteQuery({
            queryKey: ['feed'],
            queryFn: ({ pageParam = 0 }: { pageParam: number }) => service.getFeedNotes(token, `page=${pageParam}`),
            initialPageParam: 0,
            getNextPageParam: (page, _, pageParam) => page.last ? undefined : pageParam + 1,
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            retry: 3
        })
    }

    const useFindUserTags = (token: string | null, username: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['userTags', username],
            queryFn: customQueryFn(() => service.findUserTags(token, username)),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: smartRetry
        })
    }

    const useFindUserNotes = (token: string | null, username: string, parameters?: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['userNotes', username, parameters],
            queryFn: customQueryFn(() => service.searchUserNotes(token, username, parameters)),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: smartRetry
        })
    }

    const useSearchNotes = (parameters?: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['searchNotes', parameters],
            queryFn: () => service.searchNotes(parameters),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: 3
        })
    }

    const useSearchTags = (parameters?: string, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['searchTags', parameters],
            queryFn: () => service.searchTags(parameters),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: 3
        })
    }

    const useGetNote = (token: string | null, id: UUID, enabled: boolean = true) => {
        return useQuery({
            queryKey: ['note', id],
            queryFn: customQueryFn(() => service.getNote(token, id)),
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            retry: smartRetry
        })
    }

    return {
        useFindUserTags,
        useFindUserNotes,
        useGetFeed,
        useSearchNotes,
        useSearchTags,
        useGetNote
    }

}