import { AuthService } from "../auth";
import { Flame, Page } from "@/core";
import { useAPI } from "@/data/hooks";
import { useCallback } from "react";
import { UUID } from "crypto";

export const FlameService = () => {

    const { httpPost, httpGet, httpDelete } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const inflameNote = useCallback(async (token: string, noteId: UUID) => {
        const endpoint = `/flames/${noteId}`;
        try {
            return await httpPost(endpoint, undefined, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, undefined, { useToken: newToken }));
        }
    }, [httpPost, handleExpiredToken])

    const getUserFlames = useCallback(async (token: string, username: string, parameters?: string): Promise<Page<Flame>> => {
        const endpoint: string = `/flames/${username}?${parameters}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    const deflameNote = useCallback(async (token: string, noteId: UUID) => {
        const endpoint = `/flames/${noteId}`;
        try {
            return await httpDelete(endpoint, undefined, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, undefined, { useToken: newToken }));
        }
    }, [httpDelete, handleExpiredToken])

    const searchUserFlames = useCallback(async (token: string | null, username: string, parameters?: string): Promise<Page<Flame>> => {
        const endpoint: string = `/flames/${username}?${parameters}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }, [httpGet, handleExpiredToken])

    return { inflameNote, getUserFlames, deflameNote, searchUserFlames }

}