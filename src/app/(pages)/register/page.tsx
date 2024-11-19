'use client';

import { CreateUserFormData, createUserFormSchema, handleFieldErrors } from "@/core";
import { Form } from "@/components/form";
import { FormProvider, useForm } from "react-hook-form";
import { IconMail, IconAt, IconSignature } from "@tabler/icons-react";
import { TsParticles } from "@/components/TsParticles";
import { useServices } from "@/data/hooks";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';

const FormSection = () => {

    const { userService: { createUser } } = useServices();

    const createUserForm = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    });

    const { handleSubmit, setError } = createUserForm;

    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    const onSubmit = async (data: CreateUserFormData) => {
        setIsRequesting(true);
        try {
            await createUser(data);
        } catch (errors) {
            if (Array.isArray(errors)) handleFieldErrors(errors, setError)
        } finally {
            setIsRequesting(false);
        }
    }

    return (
        <div>
            <FormProvider {...createUserForm}>
                <Form.Tag onSubmit={handleSubmit(onSubmit)}>
                    <Form.Header />
                    <Form.Field>
                        <Form.Label htmlFor="email" tooltip="O email deve ser válido e de sua autoria.">Email</Form.Label>
                        <Form.Input name="email" type="email" required icon={<IconMail title="Email" />} />
                        <Form.Error field="email" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Label htmlFor="username" tooltip="O tamanho deve estar entre 4 e 12 caracteres, apenas letras, números, _ e .">Usuário</Form.Label>
                        <Form.Input name="username" type="text" required icon={<IconAt title="@" />} />
                        <Form.Error field="username" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Label htmlFor="displayName" tooltip="O tamanho deve estar entre 4 e 24 caracteres.">Nome</Form.Label>
                        <Form.Input name="displayName" type="text" required icon={<IconSignature title="Nome" />} />
                        <Form.Error field="displayName" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Label htmlFor="password" tooltip="O tamanho deve estar entre 4 e 8 caracteres.">Senha</Form.Label>
                        <Form.Input name="password" type="password" autoComplete="on" required />
                        <Form.Strength field="password" />
                        <Form.Error field="password" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Label htmlFor="repeatPassword">Repetir senha</Form.Label>
                        <Form.Input name="repeatPassword" type="password" required autoComplete="on" />
                        <Form.Error field="repeatPassword" />
                    </Form.Field>
                    <Form.Button isRequesting={isRequesting}>Cadastrar</Form.Button>
                </Form.Tag>
            </FormProvider>
        </div>
    );

};

const Page = () => {
    return (
        <div className="w-screen max-w-full min-h-screen insm:min-h-svh p-2 flex items-center justify-center">
            <TsParticles />
            <FormSection />
        </div>
    );
}

export default Page;