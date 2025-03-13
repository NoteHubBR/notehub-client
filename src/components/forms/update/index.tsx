import { EditUserFormData, editUserFormSchema } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { forwardRef } from "react";
import { IconX } from "@tabler/icons-react";
import { useUser } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    closeRef?: React.RefObject<HTMLButtonElement>;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ closeRef, ...rest }, ref) => {

    const { user } = useUser();

    const editUserForm = useForm<EditUserFormData>({
        resolver: zodResolver(editUserFormSchema)
    })

    const { handleSubmit } = editUserForm;

    const onSubmit = (data: EditUserFormData) => {
        console.log(data)
    }

    if (user) return (
        <FormProvider {...editUserForm}>
            <form
                ref={ref}
                onSubmit={handleSubmit(onSubmit)}
                className="overflow-y-auto
                max-w-[555px] h-[666px] inmd:h-svh m-auto
                pb-9 rounded-xl inmd:rounded-none
                dark:bg-black bg-white"
                {...rest}
            >
                <Element.Header
                    ref={closeRef}
                    aria-label="Salvar"
                    type="submit"
                    icon={<IconX size={20} />}
                    title="Editar perfil"
                >
                    Salvar
                </Element.Header>
                <Element.Main>
                    <Element.Banner user={user}>
                        <Element.Avatar user={user} />
                    </Element.Banner>
                    <Element.Privacy />
                    <Element.Field>
                        <Element.Input name="username" defaultValue={user.username} type="text" required />
                        <Element.Label htmlFor="username">Usuário</Element.Label>
                        <Element.Error field="username" />
                    </Element.Field>
                    <Element.Field>
                        <Element.Input name="displayName" defaultValue={user.display_name} type="text" required />
                        <Element.Label htmlFor="displayName">Nome</Element.Label>
                        <Element.Error field="displayName" />
                    </Element.Field>
                    <Element.Field>
                        <Element.Textarea name="message" defaultValue={user.message} />
                        <Element.Label htmlFor="message" className="top-6">Mensagem</Element.Label>
                        <Element.Error field="message" className="!top-[95%]" />
                    </Element.Field>
                </Element.Main>
                <ul>
                    <li><Element.Link href={'/user/settings/mutuals'}>Mútuos</Element.Link></li>
                    <li><Element.Link href={'/user/settings'}>Configurações</Element.Link></li>
                </ul>
            </form>
        </FormProvider>
    )

})

Form.displayName = 'Form';