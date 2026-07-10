import { ApiClient } from '@/api';
import { LoginFormData, Token, User, Cookies } from "@/core";

export const createAuthService = (publicApi: ApiClient) => {

    const loginUserByDefault = async (data: LoginFormData): Promise<{ token: Token, user: User }> => {
        return await publicApi.post('/auth/login', data);
    }

    const loginUserByGoogle = async (token: { token: string }): Promise<{ token: Token, user: User }> => {
        return await publicApi.post('/auth/login/google', token);
    }

    const loginUserByGitHub = async (code: { code: string }): Promise<{ token: Token, user: User }> => {
        return await publicApi.post('/auth/login/github', code);
    }

    const logoutUser = async (): Promise<void> => {
        return await publicApi.delete('/auth/logout', undefined, { refreshToken: Cookies.get('rtoken') });
    }

    const sendSecretKeyRequest = async (email: { email: string }): Promise<void> => {
        return await publicApi.post('/auth/secret-key', email);
    }

    return {
        loginUserByDefault,
        loginUserByGoogle,
        loginUserByGitHub,
        logoutUser,
        sendSecretKeyRequest,
    }

}