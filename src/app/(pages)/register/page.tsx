'use client';

import { Form } from "@/components/form";
import { FormProvider, useForm } from "react-hook-form";
import { IconMail, IconAt, IconSignature } from "@tabler/icons-react";
import { TsParticles } from "@/components/TsParticles";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Page = () => {

    const createUserFormSchema = z.object({
        email: z
            .string().toLowerCase()
            .email('Email deve ser válido.'),
        username: z
            .string().toLowerCase()
            .regex(/^[a-zA-Z0-9_.]+$/, "Use letras, números, _ ou .")
            .min(4, 'Mínimo de 4 caracteres.')
            .max(12, 'Máximo de 12 caracteres.'),
        displayName: z
            .string()
            .regex(/^(?!.*[\\u00A0\\u2007\\u202F]).*$/, "👀")
            .min(4, 'Mínimo de 4 caracteres.')
            .max(24, 'Máximo de 24 caracteres.'),
        avatar: z
            .string().default("/avatar.png"),
        password: z
            .string()
            .min(4, 'Mínimo de 4 caracteres.')
            .max(8, 'Máximo de 8 caracteres.'),
        repeatPassword: z.string()
    })
        .refine((data) => data.repeatPassword === data.password, { message: "Senhas diferentes.", path: ['repeatPassword'] })

    type CreateUserFormData = z.infer<typeof createUserFormSchema>;

    const createUserForm = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    });

    const { register, formState: { errors }, handleSubmit } = createUserForm;

    const createUser = async (data: CreateUserFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...userData } = data;
        console.log(userData);
    };

    return (
        <>
            <TsParticles />
            <div className="w-screen max-w-full min-h-screen insm:min-h-svh p-2 flex items-center justify-center">
                <FormProvider {...createUserForm}>
                    <form
                        onSubmit={handleSubmit(createUser)}
                        className="
                            w-[444px] insm:w-full
                            p-4
                            flex flex-col gap-4
                            rounded-md
                            backdrop-blur-sm
                            dark:bg-violet-600/20 bg-indigo-600/10
                    ">
                        <Form.Header />

                        <Form.Field>
                            <Form.Label htmlFor="email" tooltip="O email deve ser válido e de sua autoria.">Email</Form.Label>
                            <Form.Input id="email" type="email" {...register('email')} required icon={<IconMail title="Email" />} />
                            <Form.Error>{errors.email?.message}</Form.Error>
                        </Form.Field>

                        <Form.Field>
                            <Form.Label htmlFor="username" tooltip="O tamanho deve estar entre 4 e 12 caracteres, apenas letras, números, _ e .">Usuário</Form.Label>
                            <Form.Input id="username" type="text" {...register('username')} required icon={<IconAt title="@" />} />
                            <Form.Error>{errors.username?.message}</Form.Error>
                        </Form.Field>

                        <Form.Field>
                            <Form.Label htmlFor="displayName" tooltip="O tamanho deve estar entre 4 e 24 caracteres.">Nome</Form.Label>
                            <Form.Input id="displayName" type="text" {...register('displayName')} required icon={<IconSignature title="Nome" />} />
                            <Form.Error>{errors.displayName?.message}</Form.Error>
                        </Form.Field>

                        <Form.Field>
                            <Form.Label htmlFor="password" tooltip="O tamanho deve estar entre 4 e 8 caracteres.">Senha</Form.Label>
                            <Form.Input id="password" type="password" autoComplete="on" required {...register('password')} />
                            <Form.Error>{errors.password?.message}</Form.Error>
                        </Form.Field>

                        <Form.Field>
                            <Form.Label htmlFor="repeatPassword">Repetir senha</Form.Label>
                            <Form.Input id="repeatPassword" type="password" autoComplete="on" required {...register('repeatPassword')} />
                            <Form.Error>{errors.repeatPassword?.message}</Form.Error>
                        </Form.Field>

                        <Form.Button>Cadastrar</Form.Button>
                    </form>
                </FormProvider>
            </div >
        </>
    );

};

export default Page;