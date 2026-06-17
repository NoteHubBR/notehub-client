import { ApiClient } from '@/api';
import { createAuthService } from "../auth";
import { Flame, Page, Token } from "@/core";
import { UUID } from "crypto";

export const createFlameService = (api: ApiClient, updateToken: (token: Token) => void) => {

    const { withRetry } = createAuthService(api, updateToken);

    const inflameNote = async (token: string, noteId: UUID) => {
        const endpoint = `/flames/${noteId}`;
        return withRetry(token, (token) => api.post(endpoint, undefined, { token: token }));
    }

    const getUserFlames = async (token: string, username: string, parameters?: string): Promise<Page<Flame>> => {
        const endpoint: string = `/flames/${username}?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const deflameNote = async (token: string, noteId: UUID) => {
        const endpoint = `/flames/${noteId}`;
        return withRetry(token, (token) => api.delete(endpoint, undefined, { token: token }));
    }

    const searchUserFlames = async (token: string | null, username: string, parameters?: string): Promise<Page<Flame>> => {
        const endpoint: string = `/flames/${username}?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    return { inflameNote, getUserFlames, deflameNote, searchUserFlames };

}

export type FlameService = ReturnType<typeof createFlameService>;