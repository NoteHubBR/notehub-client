import { ApiClient } from '@/api';
import { CreateNoteFormData, LowDetailNote, Note, NoteTextUpdateFormData, NoteUpdateFormData, Page } from '@/core';
import { UUID } from 'crypto';
import { WithRetry } from '../token';

export const createNoteService = (publicApi: ApiClient, privateApi: ApiClient, withRetry: WithRetry) => {

    const getUserNotes = async (token: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = '/notes/private?size=9999&sort=modifiedAt,desc';
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const findUserTags = async (token: string | null, username: string): Promise<string[]> => {
        const endpoint: string = `/notes/${username}/tags`;
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const searchUserNotes = async (token: string | null, username: string, parameters?: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = `/notes/${username}/specs?${parameters}`;
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const searchNotes = async (parameters?: string): Promise<Page<LowDetailNote>> => {
        const endpoint = parameters ? `/notes/search?${parameters}` : '/notes/search';
        return await publicApi.get(endpoint);
    }

    const searchTags = async (parameters?: string): Promise<Page<LowDetailNote>> => {
        const endpoint = parameters ? `/notes/search/tag?${parameters}` : '/notes/search/tag';
        return await publicApi.get(endpoint);
    }

    const createNote = async (token: string, data: CreateNoteFormData): Promise<LowDetailNote> => {
        const endpoint = '/notes/new-note';
        return withRetry(token, (token) => privateApi.post(endpoint, data, { token: token }));
    }

    const getNote = async (token: string | null, id: UUID): Promise<Note> => {
        const endpoint = `/notes/${id}`;
        return withRetry(token, (token) => privateApi.get(endpoint, { token: token }));
    }

    const updateNote = async (token: string, id: UUID, data: NoteUpdateFormData): Promise<void> => {
        const endpoint = `/notes/${id}/edit-note`;
        return withRetry(token, (token) => privateApi.put(endpoint, data, { token: token }));
    }

    const updateNoteText = async (token: string, id: UUID, data: NoteTextUpdateFormData): Promise<void> => {
        const endpoint = `/notes/${id}/change-markdown`;
        return withRetry(token, (token) => privateApi.patch(endpoint, data, { token: token }));
    }

    const deleteNote = async (token: string, id: UUID): Promise<void> => {
        const endpoint = `/notes/${id}/delete`;
        return withRetry(token, (token) => privateApi.delete(endpoint, undefined, { token: token }));
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