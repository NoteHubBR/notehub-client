'use client'

import { Container } from '@/components/template/Container';
import { Form } from '@/components/form';
import { FormProvider, useForm } from 'react-hook-form';
import { handleFieldErrors } from '@/core';
import { IconAt } from '@tabler/icons-react';
import { LoginUserFormData, loginUserFormSchema } from '@/core/schemas/user/LoginUser';
import { TsParticles } from '@/components/TsParticles';
import { useRouter } from 'next/navigation';
import { useServices, useUser } from '@/data/hooks';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const FormSection = () => {

    const { userService: { loginUserByDefault } } = useServices();

    const { setUser } = useUser();

    const loginUserForm = useForm<LoginUserFormData>({
        resolver: zodResolver(loginUserFormSchema)
    });

    const { handleSubmit, setError } = loginUserForm;

    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (data: LoginUserFormData) => {
        setIsRequesting(true);
        try {
            const { user, ...token } = await loginUserByDefault(data);
            setUser(user, token)
            router.push('/');
        } catch (errors) {
            if (Array.isArray(errors)) handleFieldErrors(errors, setError)
        } finally {
            setIsRequesting(false);
        }
    }

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
                    <Form.Button isRequesting={isRequesting}>Entrar</Form.Button>
                    <Link href={'/signup'} className='
                        p-2
                        font-semibold text-md text-center dark:text-neutral-50 text-neutral-900
                        rounded-md
                        dark:bg-neutral-900/75 bg-neutral-50/75
                        dark:hover:bg-violet-600 hover:bg-violet-600 hover:text-neutral-50
                        transition-all
                    '>
                        Criar conta
                    </Link>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center justify-between gap-4 my-4'>
                            <hr className='w-full border-s border-violet-600/50' />
                            <span className='break-keep font-bold text-sm'>OU</span>
                            <hr className='w-full border-s border-violet-600/50' />
                        </div>
                        <Form.OAuthButton
                            src='/svgs/github-icon.svg'
                            alt='GitHub Logo'
                            brand='GitHub'
                            isRequesting={isRequesting}
                        />
                        <Form.OAuthButton
                            src='/svgs/google-icon.svg'
                            alt='Google Logo'
                            brand='Google'
                            isRequesting={isRequesting}
                        />
                    </div>
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