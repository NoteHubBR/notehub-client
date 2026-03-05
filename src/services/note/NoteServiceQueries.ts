import { NoteService } from './NoteService';
import { useGuardedQuery, useInfinitePagedQuery, usePublicQuery } from '../utils';
import { UUID } from 'crypto';

export const NoteServiceQueries = () => {

    const service = NoteService();

    const useGetFeed = (token: string, enabled: boolean = true) => {
        return useInfinitePagedQuery({
            keys: ['feed', token],
            function: (page) => service.getFeedNotes(token, `page=${page}`),
            enabled: enabled
        })
    }

    const useFindUserTags = (token: string | null, username: string, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['userTags', token, username],
            function: () => service.findUserTags(token, username),
            enabled: enabled
        })
    }

    const useFindUserNotes = (token: string | null, username: string, parameters?: string, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['userNotes', token, username, parameters],
            function: () => service.searchUserNotes(token, username, parameters),
            enabled: enabled
        })
    }

    const useSearchNotes = (parameters?: string, enabled: boolean = true) => {
        return usePublicQuery({
            keys: ['searchNotes', parameters],
            function: () => service.searchNotes(parameters),
            enabled: enabled
        })
    }

    const useSearchTags = (parameters?: string, enabled: boolean = true) => {
        return usePublicQuery({
            keys: ['searchTags', parameters],
            function: () => service.searchTags(parameters),
            enabled: enabled
        })
    }

    const useGetNote = (token: string | null, id: UUID, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['note', token, id],
            function: () => service.getNote(token, id),
            enabled: enabled
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