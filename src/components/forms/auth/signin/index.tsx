import { Cookies, handleOAuthError } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { handleFieldErrors, LoginFormData, loginFormSchema, Token, User } from "@/core";
import { IconAt } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useServices, useStore, useUser } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {

    const { authService: { loginUserByDefault, loginUserByGoogle, loginUserByGitHub } } = useServices();

    const { setStore } = useStore();
    const { setUser } = useUser();

    const loginUserForm = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema)
    })

    const { handleSubmit, setError } = loginUserForm;

    const [state, setState] = useState({
        isRequesting: false as boolean,
        isGoogleAuthInProgress: false as boolean,
        isGitHubAuthInProgress: false as boolean,
        oAuthError: undefined as string | undefined
    })

    const router = useRouter();

    const login = useCallback(({ token, user }: { token: Token, user: User }): void => {
        setUser(token, user);
        setStore({ isFirstTimer: false, isGuest: false, isExpired: false });
        Cookies.set('rtoken', token.refresh_token, token.expires_at);
        return router.push('/');
    }, [router, setStore, setUser])

    const onSubmit = async (data: LoginFormData) => {
        setState((prev) => ({ ...prev, isRequesting: true }));
        try {
            login(await loginUserByDefault(data));
        } catch (errors) {
            if (Array.isArray(errors)) handleFieldErrors(errors, setError);
        } finally {
            setState((prev) => ({ ...prev, isRequesting: false }));
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: res => {
            const submit = async () => {
                try {
                    login(await loginUserByGoogle({ token: res.access_token }));
                } catch (errors) {
                    if (Array.isArray(errors)) handleOAuthError(errors, setState);
                } finally {
                    setState((prev) => ({ ...prev, isRequesting: false, isGoogleAuthInProgress: false }));
                }
            }
            submit();
        },
        onError: () => setState((prev) => ({ ...prev, isGoogleAuthInProgress: false })),
        onNonOAuthError: () => setState((prev) => ({ ...prev, isRequesting: false, isGoogleAuthInProgress: false }))
    })

    const GHCI = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const gitHubLogin = () => router.push(`https://github.com/login/oauth/authorize?client_id=${GHCI}&scope=user:email`);
    const params = useSearchParams();
    const isFetching = useRef<boolean>(false);
    useEffect(() => {
        const code = params.get('code');
        if (isFetching.current) return;
        if (code) {
            isFetching.current = true;
            setState((prev) => ({ ...prev, isRequesting: true }));
            const submit = async () => {
                try {
                    login(await loginUserByGitHub({ code: code }).finally(() => isFetching.current = false));
                } catch (errors) {
                    if (Array.isArray(errors)) handleOAuthError(errors, setState);
                } finally {
                    setState((prev) => ({ ...prev, isRequesting: false }));
                }
            }
            submit();
        }
    }, [params])

    return (
        <FormProvider {...loginUserForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[444px] insm:w-full
                    p-4
                    flex flex-col gap-4
                    rounded-md
                    backdrop-blur-sm
                    dark:bg-primary/20 bg-indigo-600/10"
                {...props}
            >
                <Element.Header />
                <Element.Field>
                    <Element.Label htmlFor="username">Usuário</Element.Label>
                    <Element.Input name="username" type="text" required icon={<IconAt title="@" />} />
                    <Element.Error field="username" />
                </Element.Field>
                <Element.Field>
                    <Element.Label htmlFor="password">Senha</Element.Label>
                    <Element.Input name="password" type="password" autoComplete="on" required />
                    <Element.Error field="password" />
                    <Link href='/recover' className='w-fit mt-2 mb-4' tabIndex={1}>
                        <span className='request-btn underline p-1 font-semibold text-sm text-secondary'>Esqueceu a senha?</span>
                    </Link>
                </Element.Field>
                <Element.Button isRequesting={state.isRequesting}>Entrar</Element.Button>
                <Element.Link href={'/signup'}>Criar conta</Element.Link>
                <Element.Separator />
                <Element.OAuthError error={state.oAuthError} />
                <Element.OAuthButton
                    src='/svgs/google-icon.svg'
                    alt='Google Logo'
                    brand='Google'
                    isRequesting={state.isRequesting}
                    isGoogleAuthInProgress={state.isGoogleAuthInProgress}
                    onClick={() => { setState((prev) => ({ ...prev, isRequesting: true, isGoogleAuthInProgress: true })); googleLogin() }}
                />
                <Element.OAuthButton
                    src='/svgs/github-icon.svg'
                    alt='GitHub Logo'
                    brand='GitHub'
                    isRequesting={state.isRequesting}
                    isGitHubAuthInProgress={state.isGitHubAuthInProgress}
                    onClick={() => { setState((prev) => ({ ...prev, isRequesting: true, isGitHubAuthInProgress: true })); gitHubLogin() }}
                />
            </form>
        </FormProvider>
    )

}