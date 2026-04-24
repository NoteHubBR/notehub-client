import { LoginFormData, Token, User, Cookies, RecoverFormData, Session, FindSessionsFormData } from "@/core";
import { useAPI, useUser } from "@/data/hooks";
import { useCallback } from "react";
import { UUID } from 'crypto';

export const AuthService = () => {

    const { httpPost, httpGet, httpDelete } = useAPI();

    const { updateToken } = useUser();

    const loginUserByDefault = async (data: LoginFormData): Promise<{ token: Token, user: User }> => {
        try {
            return await httpPost('/auth/login', data, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }

    const loginUserByGoogle = async (token: { token: string }): Promise<{ token: Token, user: User }> => {
        try {
            return await httpPost('/auth/login/google', token, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }

    const loginUserByGitHub = async (code: { code: string }): Promise<{ token: Token, user: User }> => {
        try {
            return await httpPost('/auth/login/github', code, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }

    const refreshUser = async (): Promise<{ token: Token, user: User }> => {
        try {
            return await httpGet(`/auth/refresh`, { useProgress: true, useRefreshToken: Cookies.get('rtoken') });
        } catch (error) {
            throw error;
        }
    }

    const handleExpiredToken = async (error: any, func: (token: string) => Promise<any>) => {
        if (error.data.message === 'Token inválido.') {
            const { token } = await refreshUser();
            Cookies.set('rtoken', token.refresh_token, token.expires_at);
            updateToken(token);
            return await func(token.access_token);
        }
        else throw error;
    }

    const logoutUser = async (): Promise<void> => {
        try {
            return await httpDelete('/auth/logout', undefined, { useProgress: true, useRefreshToken: Cookies.get('rtoken') });
        } catch (error) {
            throw error;
        }
    }

    const sendSecretKeyRequest = useCallback(async (email: { email: string }): Promise<void> => {
        try {
            return await httpPost('/auth/secret-key', email, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }, [httpPost])

    const sendEmailChangeRequest = useCallback(async (email: { email: string }): Promise<void> => {
        try {
            return await httpPost('/auth/change-email', email, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }, [httpPost])

    const sendPasswordChangeRequest = useCallback(async (data: RecoverFormData | { email: string }): Promise<void> => {
        try {
            return await httpPost('/auth/change-password', data, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }, [httpPost])

    const findAllSessions = async (token: string, data: FindSessionsFormData): Promise<Session[]> => {
        try {
            return await httpPost('/auth/sessions', data, { useProgress: true, useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpPost('/auth/sessions', data, { useProgress: true, useToken: newToken }));
        }
    }

    const disconnectSession = async (id: UUID): Promise<void> => {
        try {
            return await httpDelete(`/auth/session/${id}`, undefined, { useProgress: true });
        } catch (error) {
            throw error;
        }
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
        disconnectSession
    }

}