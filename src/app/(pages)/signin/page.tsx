'use client'

import { Container } from '@/components/template/Container';
import { Cookies, handleFieldErrors, Token, User } from '@/core';
import { Form } from '@/components/form';
import { FormProvider, useForm } from 'react-hook-form';
import { IconAt } from '@tabler/icons-react';
import { LoginUserFormData, loginUserFormSchema } from '@/core/schemas/user/LoginUser';
import { TsParticles } from '@/components/TsParticles';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useServices, useStore, useUser } from '@/data/hooks';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const FormSection = () => {

    const { authService: { loginUserByDefault, loginUserByGoogle } } = useServices();

    const { setStore } = useStore();
    const { setUser } = useUser();

    const loginUserForm = useForm<LoginUserFormData>({
        resolver: zodResolver(loginUserFormSchema)
    })

    const { handleSubmit, setError } = loginUserForm;

    const [state, setState] = useState({
        isRequesting: false,
        isGoogleAuthInProgress: false
    });

    const router = useRouter();

    const login = ({ token, user }: { token: Token, user: User }): void => {
        setUser(token, user);
        setStore({ isFirstTimer: false, isGuest: false, isExpired: false });
        Cookies.set('rtoken', token.refresh_token, token.expires_at);
        return router.push('/');
    }

    const onSubmit = async (data: LoginUserFormData) => {
        setState((prev) => ({ ...prev, isRequesting: true }))
        try {
            login(await loginUserByDefault(data));
        } catch (errors) {
            if (Array.isArray(errors)) handleFieldErrors(errors, setError)
        } finally {
            setState((prev) => ({ ...prev, isRequesting: false }))
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: res => {
            const submit = async () => {
                login(await loginUserByGoogle({ token: res.access_token }))
            }
            submit();
            setState((prev) => ({ ...prev, isGoogleAuthInProgress: false }));
        },
        onError: () => setState(({ isRequesting: false, isGoogleAuthInProgress: false })),
        onNonOAuthError: () => setState(({ isRequesting: false, isGoogleAuthInProgress: false }))
    });

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
                        onClick={() => { setState(({ isRequesting: true, isGoogleAuthInProgress: true })); googleLogin() }}
                    />
                    <Form.OAuthButton
                        src='/svgs/github-icon.svg'
                        alt='GitHub Logo'
                        brand='GitHub'
                        isRequesting={state.isRequesting}
                        onClick={() => { return }}
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