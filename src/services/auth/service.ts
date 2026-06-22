import { ApiClient } from '@/api';
import { LoginFormData, Token, User, Cookies, RecoverFormData, Session, FindSessionsFormData } from "@/core";
import { UUID } from 'crypto';

export type WithRetry = <T>(token: string | null, fn: (token: string | null) => Promise<T>) => Promise<T>;

export const createAuthService = (publicApi: ApiClient, privateApi: ApiClient, updateToken: (token: Token) => void) => {

    const loginUserByDefault = async (data: LoginFormData): Promise<{ token: Token, user: User }> => {
        return await publicApi.post('/auth/login', data);
    }

    const loginUserByGoogle = async (token: { token: string }): Promise<{ token: Token, user: User }> => {
        return await publicApi.post('/auth/login/google', token);
    }

    const loginUserByGitHub = async (code: { code: string }): Promise<{ token: Token, user: User }> => {
        return await publicApi.post('/auth/login/github', code);
    }

    const refreshUser = async (): Promise<{ token: Token, user: User }> => {
        return await publicApi.get(`/auth/refresh`, { refreshToken: Cookies.get('rtoken') });
    }

    const logoutUser = async (): Promise<void> => {
        return await publicApi.delete('/auth/logout', undefined, { refreshToken: Cookies.get('rtoken') });
    }

    const sendSecretKeyRequest = async (email: { email: string }): Promise<void> => {
        return await publicApi.post('/auth/secret-key', email);
    }

    const sendEmailChangeRequest = async (email: { email: string }): Promise<void> => {
        return await publicApi.post('/auth/change-email', email);
    }

    const sendPasswordChangeRequest = async (data: RecoverFormData | { email: string }): Promise<void> => {
        return await publicApi.post('/auth/change-password', data);
    }

    const disconnectSession = async (id: UUID): Promise<void> => {
        return await publicApi.delete(`/auth/session/${id}`, undefined);
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
        return withRetry(token, (token) => privateApi.post('/auth/sessions', data, { token: token }));
    }

    return {
        loginUserByDefault,
        loginUserByGoogle,
        loginUserByGitHub,
        refreshUser,
        logoutUser,
        sendSecretKeyRequest,
        sendEmailChangeRequest,
        sendPasswordChangeRequest,
        findAllSessions,
        disconnectSession,
        withRetry
    }

}