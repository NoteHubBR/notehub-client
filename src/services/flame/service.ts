import { ApiClient } from '@/api';
import { Flame, Page } from "@/core";
import { UUID } from "crypto";
import { WithRetry } from '../token';

export const createFlameService = (api: ApiClient, withRetry: WithRetry) => {

    const inflameNote = async (token: string, noteId: UUID) => {
        const endpoint = `/flames/${noteId}`;
        return withRetry(token, (token) => api.post(endpoint, undefined, { token: token }));
    }

    const deflameNote = async (token: string, noteId: UUID) => {
        const endpoint = `/flames/${noteId}`;
        return withRetry(token, (token) => api.delete(endpoint, undefined, { token: token }));
    }

    const getUserFlames = async (token: string): Promise<Page<Flame>> => {
        const endpoint: string = '/flames/private?size=9999&sort=createdAt,desc';
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const searchUserFlames = async (token: string | null, username: string, parameters?: string): Promise<Page<Flame>> => {
        const endpoint: string = `/flames/${username}/specs?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    return { inflameNote, deflameNote, getUserFlames, searchUserFlames };

}

export type FlameService = ReturnType<typeof createFlameService>;