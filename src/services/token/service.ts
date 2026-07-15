import { ApiClient } from '@/api';
import { Token, User, Cookies, RecoverFormData, Session, FindSessionsFormData } from "@/core";
import { UUID } from 'crypto';

export type WithRetry = <T>(token: string | null, fn: (token: string | null) => Promise<T>) => Promise<T>;

export const createTokenService = (publicApi: ApiClient, privateApi: ApiClient, updateToken: (token: Token) => void) => {

    const refreshUser = async (): Promise<{ token: Token, user: User }> => {
        return await publicApi.get(`/tokens/refresh`, { refreshToken: Cookies.get('rtoken') });
    }

    const sendEmailChangeRequest = async (email: { email: string }): Promise<void> => {
        return await publicApi.post('/tokens/change-email', email);
    }

    const sendPasswordChangeRequest = async (data: RecoverFormData | { email: string }): Promise<void> => {
        return await publicApi.post('/tokens/change-password', data);
    }

    const disconnectSession = async (id: UUID): Promise<void> => {
        return await publicApi.delete(`/tokens/session/${id}`, undefined);
    }

    const handleExpiredToken = async <T>(
        error: any,
        fn: (newToken: string) => Promise<T>,
        onTokenRefreshed: (token: Token) => void
    ): Promise<T> => {
        if (error.data && error.data.message === 'Token inválido.') {
            const { token } = await refreshUser();
            Cookies.set('rtoken', token.refresh_token, token.expires_at);
            onTokenRefreshed(token);
            return fn(token.access_token);
        }
        throw error;
    }

    const withRetry = async <T>(
        token: string | null,
        fn: (token: string | null) => Promise<T>
    ): Promise<T> => {
        try {
            return await fn(token);
        } catch (error) {
            return handleExpiredToken(error, (newToken) => fn(newToken), updateToken);
        }
    }

    const findAllSessions = async (token: string, data: FindSessionsFormData): Promise<Session[]> => {
        return withRetry(token, (token) => privateApi.post('/tokens/sessions', data, { token: token }));
    }

    return {
        refreshUser,
        sendEmailChangeRequest,
        sendPasswordChangeRequest,
        findAllSessions,
        disconnectSession,
        withRetry,
    }

}