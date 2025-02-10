import { LoginUserFormData, Token, User, Cookies } from "@/core";
import { useAPI, useUser } from "@/data/hooks";

export const AuthService = () => {

    const { httpPost, httpGet } = useAPI();

    const { setUser } = useUser();

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
            const { token, user } = await refreshUser();
            setUser(token, user);
            return await func(token.access_token);
        }
        else throw error;
    }

    return { loginUserByDefault, loginUserByGoogle, loginUserByGitHub, refreshUser, handleExpiredToken }

}