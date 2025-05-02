import { AuthService } from "../auth";
import { LowDetailNote, Page } from "@/core";
import { useAPI } from "@/data/hooks";
import { useCallback } from 'react';

export const NoteService = () => {

    const { httpGet } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const getUserNotes = useCallback(async (token: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = '/notes/private?size=9999&sort=modifiedAt,desc';
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    const findUserTags = useCallback(async (token: string | null, username: string): Promise<string[]> => {
        const endpoint: string = `/notes/${username}/tags`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    const searchUserNotes = useCallback(async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = `/notes/${username}/specs?${parameters}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    const getFeedNotes = useCallback(async (token: string, params?: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = `/notes/private/following?${params}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    return { getUserNotes, findUserTags, searchUserNotes, getFeedNotes }

}