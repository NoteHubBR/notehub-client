import { LoginUserFormData, Token, User, Cookies } from "@/core";
import { useAPI, useUser } from "@/data/hooks";
import { useCallback } from "react";

export const AuthService = () => {

    const { httpPost, httpGet, httpDelete } = useAPI();

    const { updateToken } = useUser();

    const loginUserByDefault = async (data: LoginUserFormData): Promise<{ token: Token, user: User }> => {
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
            return await httpGet(`/auth/refresh?token=${Cookies.get('rtoken')}`, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }

    const handleExpiredToken = async (error: any, func: (token: string) => Promise<any>) => {
        if (error.message === 'Token inválido.') {
            const { token } = await refreshUser();
            Cookies.set('rtoken', token.refresh_token, token.expires_at);
            updateToken(token);
            return await func(token.access_token);
        }
        else throw error;
    }

    const logoutUser = async (token: string): Promise<void> => {
        try {
            return await httpDelete('/auth/logout', { useToken: token, useProgress: true });
        } catch (error) {
            throw error;
        }
    }

    const sendEmailChangeRequest = useCallback(async (email: { email: string }): Promise<void> => {
        try {
            return await httpPost('/auth/change-email', email, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }, [httpPost])

    const sendPasswordChangeRequest = useCallback(async (email: { email: string }): Promise<void> => {
        try {
            return await httpPost('/auth/change-password', email, { useProgress: true });
        } catch (error) {
            throw error;
        }
    }, [httpPost])

    return {
        loginUserByDefault,
        loginUserByGoogle,
        loginUserByGitHub,
        refreshUser,
        handleExpiredToken,
        logoutUser,
        sendEmailChangeRequest,
        sendPasswordChangeRequest
    }

}