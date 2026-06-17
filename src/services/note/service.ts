import { ApiClient } from '@/api';
import { createAuthService } from '../auth';
import { CreateNoteFormData, LowDetailNote, Note, NoteTextUpdateFormData, NoteUpdateFormData, Page, Token } from '@/core';
import { UUID } from 'crypto';

export const createNoteService = (api: ApiClient, updateToken: (token: Token) => void) => {

    const { withRetry } = createAuthService(api, updateToken);

    const getUserNotes = async (token: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = '/notes/private?size=9999&sort=modifiedAt,desc';
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const findUserTags = async (token: string | null, username: string): Promise<string[]> => {
        const endpoint: string = `/notes/${username}/tags`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const searchUserNotes = async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = `/notes/${username}/specs?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const searchNotes = async (parameters?: string): Promise<Page<LowDetailNote>> => {
        const endpoint = parameters ? `/notes/search?${parameters}` : '/notes/search';
        try {
            return await api.get(endpoint);
        } catch (error) {
            throw error;
        }
    }

    const searchTags = async (parameters?: string): Promise<Page<LowDetailNote>> => {
        const endpoint = parameters ? `/notes/search/tag?${parameters}` : '/notes/search/tag';
        try {
            return await api.get(endpoint);
        } catch (error) {
            throw error;
        }
    }

    const createNote = async (token: string, data: CreateNoteFormData): Promise<LowDetailNote> => {
        const endpoint = '/notes/new-note';
        return withRetry(token, (token) => api.post(endpoint, data, { token: token }));
    }

    const getNote = async (token: string | null, id: UUID): Promise<Note> => {
        const endpoint = `/notes/${id}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const updateNote = async (token: string, id: UUID, data: NoteUpdateFormData): Promise<void> => {
        const endpoint = `/notes/${id}/edit-note`;
        return withRetry(token, (token) => api.put(endpoint, data, { token: token }));
    }

    const updateNoteText = async (token: string, id: UUID, data: NoteTextUpdateFormData): Promise<void> => {
        const endpoint = `/notes/${id}/change-markdown`;
        return withRetry(token, (token) => api.patch(endpoint, data, { token: token }));
    }

    const deleteNote = async (token: string, id: UUID): Promise<void> => {
        const endpoint = `/notes/${id}/delete`;
        return withRetry(token, (token) => api.delete(endpoint, undefined, { token: token }));
    }

    return {
        getUserNotes,
        findUserTags,
        searchUserNotes,
        searchNotes,
        searchTags,
        createNote,
        getNote,
        updateNote,
        updateNoteText,
        deleteNote
    }

}

export type NoteService = ReturnType<typeof createNoteService>;