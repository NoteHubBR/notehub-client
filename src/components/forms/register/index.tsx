import { CreateUserFormData, createUserFormSchema, handleFieldErrors } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { IconAt, IconMail, IconSignature } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useServices } from "@/data/hooks";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {

    const { userService: { createUser } } = useServices();

    const createUserForm = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })

    const { handleSubmit, setError } = createUserForm;

    const [isRequesting, setIsRequesting] = useState<boolean>();

    const router = useRouter();

    const onSubmit = async (data: CreateUserFormData) => {
        setIsRequesting(true)
        try {
            await createUser(data);
            router.push('/sent')
        } catch (errors) {
            if (Array.isArray(errors)) handleFieldErrors(errors, setError)
        } finally {
            setIsRequesting(false)
        }
    }

    return (
        <FormProvider {...createUserForm}>
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
                    <Element.Label htmlFor="email" tooltip="O email deve ser válido e de sua autoria.">Email</Element.Label>
                    <Element.Input name="email" type="email" required icon={<IconMail title="Email" />} />
                    <Element.Error field="email" />
                </Element.Field>
                <Element.Field>
                    <Element.Label htmlFor="username" tooltip="O tamanho deve estar entre 4 e 12 caracteres, apenas letras, números, _ e .">Usuário</Element.Label>
                    <Element.Input name="username" type="text" required icon={<IconAt title="@" />} />
                    <Element.Error field="username" />
                </Element.Field>
                <Element.Field>
                    <Element.Label htmlFor="displayName" tooltip="O tamanho deve estar entre 4 e 24 caracteres.">Nome</Element.Label>
                    <Element.Input name="displayName" type="text" required icon={<IconSignature title="Nome" />} />
                    <Element.Error field="displayName" />
                </Element.Field>
                <Element.Field>
                    <Element.Label htmlFor="password" tooltip="O tamanho deve estar entre 4 e 8 caracteres.">Senha</Element.Label>
                    <Element.Input name="password" type="password" autoComplete="on" required />
                    <Element.Strength field="password" />
                    <Element.Error field="password" />
                </Element.Field>
                <Element.Field>
                    <Element.Label htmlFor="repeatPassword">Repetir senha</Element.Label>
                    <Element.Input name="repeatPassword" type="password" required autoComplete="on" />
                    <Element.Error field="repeatPassword" />
                </Element.Field>
                <Element.Button isRequesting={isRequesting}>Cadastrar</Element.Button>
            </form>
        </FormProvider>
    )

}