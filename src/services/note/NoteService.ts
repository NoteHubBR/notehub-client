import { AuthService } from "../auth";
import { CreateNoteFormData, LowDetailNote, Note, NoteTextUpdateFormData, Page } from "@/core";
import { useAPI } from "@/data/hooks";
import { useCallback } from 'react';
import { UUID } from "crypto";

export const NoteService = () => {

    const { httpPost, httpGet, httpPatch, httpDelete } = useAPI();

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

    const searchNotes = useCallback(async (parameters?: string): Promise<Page<LowDetailNote>> => {
        try {
            return await httpGet(`/notes/search?${parameters}`);
        } catch (error) {
            throw error;
        }
    }, [httpGet])

    const searchTags = useCallback(async (parameters?: string): Promise<Page<LowDetailNote>> => {
        try {
            return await httpGet(`/notes/search/tag?${parameters}`);
        } catch (error) {
            throw error;
        }
    }, [httpGet])

    const createNote = useCallback(async (token: string, data: CreateNoteFormData): Promise<LowDetailNote> => {
        const endpoint = '/notes/new-note';
        try {
            return await httpPost(endpoint, data, { useToken: token, useProgress: true });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, data, { useToken: newToken }));
        }
    }, [handleExpiredToken, httpPost])

    const getNote = useCallback(async (token: string | null, id: UUID): Promise<Note> => {
        const endpoint = `/notes/${id}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [handleExpiredToken, httpGet])

    const updateNoteText = useCallback(async (token: string, id: UUID, data: NoteTextUpdateFormData): Promise<void> => {
        const endpoint = `/notes/${id}/change-markdown`;
        try {
            return await httpPatch(endpoint, data, { useToken: token, useProgress: true });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpPatch(endpoint, data, { useToken: newToken, useProgress: true }));
        }
    }, [handleExpiredToken, httpPatch])

    const deleteNote = useCallback(async (token: string, id: UUID): Promise<void> => {
        const endpoint = `/notes/${id}/delete`;
        try {
            return await httpDelete(endpoint, undefined, { useToken: token, useProgress: true });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, undefined, { useToken: newToken, useProgress: true }));
        }
    }, [handleExpiredToken, httpDelete])

    return {
        getUserNotes,
        findUserTags,
        searchUserNotes,
        getFeedNotes,
        searchNotes,
        searchTags,
        createNote,
        getNote,
        updateNoteText,
        deleteNote
    }

}