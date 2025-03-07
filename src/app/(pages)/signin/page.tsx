'use client';

import { Container } from '@/components/template/Container';
import { Cookies, handleFieldErrors, Token, User } from '@/core';
import { Form } from '@/components/forms/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { IconAt } from '@tabler/icons-react';
import { LoginUserFormData, loginUserFormSchema } from '@/core/schemas/user/LoginUser';
import { TsParticles } from '@/components/TsParticles';
import { useEffect, useRef, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { useServices, useStore, useUser } from '@/data/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const FormSection = () => {

    const { authService: { loginUserByDefault, loginUserByGoogle, loginUserByGitHub } } = useServices();

    const { setStore } = useStore();
    const { setUser } = useUser();

    const loginUserForm = useForm<LoginUserFormData>({
        resolver: zodResolver(loginUserFormSchema)
    })

    const { handleSubmit, setError } = loginUserForm;

    const [state, setState] = useState({
        isRequesting: false,
        isGoogleAuthInProgress: false,
        isGitHubAuthInProgress: false
    });

    const router = useRouter();

    const login = ({ token, user }: { token: Token, user: User }): void => {
        setUser(token, user);
        setStore({ isFirstTimer: false, isGuest: false, isExpired: false });
        Cookies.set('rtoken', token.refresh_token, token.expires_at);
        return router.push('/');
    }

    const onSubmit = async (data: LoginUserFormData) => {
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
                login(await loginUserByGoogle({ token: res.access_token }));
            }
            submit();
            setState((prev) => ({ ...prev, isRequesting: false, isGoogleAuthInProgress: false }));
        },
        onError: () => setState((prev) => ({ ...prev, isGoogleAuthInProgress: false })),
        onNonOAuthError: () => setState((prev) => ({ ...prev, isRequesting: false, isGoogleAuthInProgress: false }))
    });

    const GHCI = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const gitHubLogin = () => router.push(`https://github.com/login/oauth/authorize?client_id=${GHCI}`);
    const params = useSearchParams();
    const isFetching = useRef<boolean>(false);
    useEffect(() => {
        const code = params.get('code');
        if (isFetching.current) return;
        if (code) {
            isFetching.current = true;
            setState((prev) => ({ ...prev, isRequesting: true }));
            const submit = async () => {
                login(await loginUserByGitHub({ code: code }).finally(() => isFetching.current = false));
            }
            submit();
            setState((prev) => ({ ...prev, isRequesting: false }));
        }
    }, [params])

    return (
        <main>
            <FormProvider {...loginUserForm}>
                <Form.Tag onSubmit={handleSubmit(onSubmit)}>
                    <Form.Header />
                    <Form.Field>
                        <Form.Label htmlFor="username">Usuário</Form.Label>
                        <Form.Input name="username" type="text" required icon={<IconAt title="@" />} />
                        <Form.Error field="username" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Label htmlFor="password">Senha</Form.Label>
                        <Form.Input name="password" type="password" autoComplete="on" required />
                        <Form.Error field="password" />
                        <Link href={'/recover'} target='blank' className='w-fit mt-2 mb-4' tabIndex={1}>
                            <span className='request-btn underline p-1 font-semibold text-sm text-indigo-500'>Esqueceu a senha?</span>
                        </Link>
                    </Form.Field>
                    <Form.Button isRequesting={state.isRequesting}>Entrar</Form.Button>
                    <Form.Link href={'/signup'}>Criar conta</Form.Link>
                    <Form.Separator />
                    <Form.OAuthButton
                        src='/svgs/google-icon.svg'
                        alt='Google Logo'
                        brand='Google'
                        isRequesting={state.isRequesting}
                        isGoogleAuthInProgress={state.isGoogleAuthInProgress}
                        onClick={() => { setState((prev) => ({ ...prev, isRequesting: true, isGoogleAuthInProgress: true })); googleLogin() }}
                    />
                    <Form.OAuthButton
                        src='/svgs/github-icon.svg'
                        alt='GitHub Logo'
                        brand='GitHub'
                        isRequesting={state.isRequesting}
                        isGitHubAuthInProgress={state.isGitHubAuthInProgress}
                        onClick={() => { setState((prev) => ({ ...prev, isRequesting: true, isGitHubAuthInProgress: true })); gitHubLogin() }}
                    />
                </Form.Tag>
            </FormProvider>
        </main>
    )
}

const Page = () => {
    return (
        <Container className='flex items-center justify-center p-2'>
            <TsParticles />
            <FormSection />
        </Container>
    )
}

export default Page;