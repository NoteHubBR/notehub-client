'use client'

import { Container } from '@/components/template/Container';
import { Form } from '@/components/form';
import { FormProvider, useForm } from 'react-hook-form';
import { IconAt } from '@tabler/icons-react';
import { LoginUserFormData, loginUserFormSchema } from '@/core/schemas/user/LoginUser';
import { TsParticles } from '@/components/TsParticles';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const FormSection = () => {

    const loginUserForm = useForm<LoginUserFormData>({
        resolver: zodResolver(loginUserFormSchema)
    });

    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    return (
        <FormProvider {...loginUserForm}>
            <Form.Tag>
                <Form.Header />
                <Form.Field>
                    <Form.Label htmlFor="username">Usuário</Form.Label>
                    <Form.Input name="username" type="text" required icon={<IconAt title="@" />} />
                    <Form.Error field="username" />
                </Form.Field>
                <Form.Field>
                    <Form.Label htmlFor="password">Senha</Form.Label>
                    <Form.Input name="password" type="password" autoComplete="on" required />
                    <Form.Strength field="password" />
                    <Form.Error field="password" />
                    <Link href={'/recover'} target='blank' className='w-fit mb-4'>
                        <p className='underline font-semibold text-sm text-indigo-500'>Esqueceu a senha?</p>
                    </Link>
                </Form.Field>
                <Form.Button>Entrar</Form.Button>
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
                        src='https://www.svgrepo.com/show/303615/github-icon-1-logo.svg'
                        alt='GitHub Logo'
                        brand='GitHub'
                        isRequesting={isRequesting}
                    />
                    <Form.OAuthButton
                        src='https://www.svgrepo.com/show/303108/google-icon-logo.svg'
                        alt='Google Logo'
                        brand='Google'
                        isRequesting={isRequesting}
                    />
                </div>
            </Form.Tag>
        </FormProvider>
    )
}

const Page = () => {
    return (
        <Container className='flex items-center justify-center'>
            <TsParticles />
            <FormSection />
        </Container>
    )
}

export default Page;