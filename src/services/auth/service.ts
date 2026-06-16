import { ApiClient } from '@/api';
import { LoginFormData, Token, User, Cookies, RecoverFormData, Session, FindSessionsFormData } from "@/core";
import { UUID } from 'crypto';

export const createAuthService = (api: ApiClient, updateToken: (token: Token) => void) => {

    const loginUserByDefault = async (data: LoginFormData): Promise<{ token: Token, user: User }> => {
        try {
            return await api.post('/auth/login', data);
        } catch (error) {
            throw error;
        }
    }

    const loginUserByGoogle = async (token: { token: string }): Promise<{ token: Token, user: User }> => {
        try {
            return await api.post('/auth/login/google', token);
        } catch (error) {
            throw error;
        }
    }

    const loginUserByGitHub = async (code: { code: string }): Promise<{ token: Token, user: User }> => {
        try {
            return await api.post('/auth/login/github', code);
        } catch (error) {
            throw error;
        }
    }

    const refreshUser = async (): Promise<{ token: Token, user: User }> => {
        try {
            return await api.get(`/auth/refresh`, { refreshToken: Cookies.get('rtoken') });
        } catch (error) {
            throw error;
        }
    }

    const logoutUser = async (): Promise<void> => {
        try {
            return await api.delete('/auth/logout', undefined, { refreshToken: Cookies.get('rtoken') });
        } catch (error) {
            throw error;
        }
    }

    const sendSecretKeyRequest = async (email: { email: string }): Promise<void> => {
        try {
            return await api.post('/auth/secret-key', email);
        } catch (error) {
            throw error;
        }
    }

    const sendEmailChangeRequest = async (email: { email: string }): Promise<void> => {
        try {
            return await api.post('/auth/change-email', email);
        } catch (error) {
            throw error;
        }
    }

    const sendPasswordChangeRequest = async (data: RecoverFormData | { email: string }): Promise<void> => {
        try {
            return await api.post('/auth/change-password', data);
        } catch (error) {
            throw error;
        }
    }

    const disconnectSession = async (id: UUID): Promise<void> => {
        try {
            return await api.delete(`/auth/session/${id}`, undefined);
        } catch (error) {
            throw error;
        }
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
            return handleExpiredToken(error, (newToken) => fn(newToken), updateToken
            )
        }
    }

    const findAllSessions = async (token: string, data: FindSessionsFormData): Promise<Session[]> => {
        return withRetry(token, (token) => api.post('/auth/sessions', data, { token: token }));
    }

    return {
        loginUserByDefault,
        loginUserByGoogle,
        loginUserByGitHub,
        refreshUser,
        handleExpiredToken,
        logoutUser,
        sendSecretKeyRequest,
        sendEmailChangeRequest,
        sendPasswordChangeRequest,
        findAllSessions,
        disconnectSession,
        withRetry
    }

}