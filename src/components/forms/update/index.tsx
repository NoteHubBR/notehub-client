import { clsx } from "clsx";
import { deleteImage, storeImg } from "@/supabase";
import { EditUserFormData, editUserFormSchema, handleFieldErrors } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { forwardRef, useState, useTransition } from "react";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    closeRef?: React.RefObject<HTMLButtonElement>;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ closeRef, ...rest }, ref) => {

    const { userService: { updateUser } } = useServices();

    const { token, user, updateUser: editUser } = useUser();

    const editUserForm = useForm<EditUserFormData>({
        resolver: zodResolver(editUserFormSchema)
    })

    const { setValue, handleSubmit, setError } = editUserForm;

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const onSubmit = async (data: EditUserFormData) => {

        if (!token || !user) return;

        startTransition(async () => {
            try {
                const newData: EditUserFormData = { ...data };
                const uploadPromises: Promise<void>[] = [];
                if (data.avatar !== user.avatar) {
                    uploadPromises.push(
                        storeImg({
                            blobUrl: data.avatar,
                            folder: "avatars"
                        }).then(newAvatar => {
                            newData.avatar = newAvatar;
                            setValue("avatar", newAvatar);
                        })
                    );
                }
                if (data.banner && data.banner !== user.banner) {
                    uploadPromises.push(
                        storeImg({
                            blobUrl: data.banner,
                            folder: "banners"
                        }).then(newBanner => {
                            newData.banner = newBanner;
                            setValue("banner", newBanner);
                        })
                    );
                }
                await Promise.all(uploadPromises);
                try {
                    const updated = await updateUser(token.access_token, newData);
                    await deleteImage(user.avatar);
                    await deleteImage(user.banner);
                    editUser(updated);
                    return router.push(`/${data.username}`);
                } catch (errors) {
                    await deleteImage(newData.avatar);
                    await deleteImage(newData.banner);
                    if (Array.isArray(errors)) handleFieldErrors(errors, setError);
                }
            }
            catch (error) { console.log(error) }
            finally { }
        })

    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    if (user) return (
        <FormProvider {...editUserForm}>
            <form
                ref={ref}
                onSubmit={handleSubmit(onSubmit)}
                className={clsx(
                    isModalOpen ? 'invisible' : 'visible',
                    'overflow-y-auto',
                    'max-w-[600px] h-[650px] inmd:h-svh m-auto',
                    'pb-9 rounded-xl inmd:rounded-none',
                    'dark:bg-black bg-white'
                )}
                {...rest}
            >
                <Element.Header
                    ref={closeRef}
                    aria-label="Salvar"
                    type="submit"
                    icon={<IconX size={20} />}
                    title="Editar perfil"
                    useBlur
                    disabled={isPending}
                >
                    {isPending ? "..." : "Salvar"}
                </Element.Header>
                <Element.Main>
                    <Element.Banner
                        user={user}
                        onModalOpen={() => setIsModalOpen(true)}
                        onModalClose={() => setIsModalOpen(false)}
                    >
                        <Element.Avatar
                            user={user}
                            onModalOpen={() => setIsModalOpen(true)}
                            onModalClose={() => setIsModalOpen(false)}
                        />
                    </Element.Banner>
                    <Element.Privacy />
                    <div className="flex flex-col gap-6 px-4">
                        <Element.Field>
                            <Element.Input name="username" defaultValue={user.username} type="text" required />
                            <Element.Label htmlFor="username" labelFor="Usuário" />
                            <Element.Error field="username" />
                        </Element.Field>
                        <Element.Field>
                            <Element.Input name="displayName" defaultValue={user.display_name} type="text" required />
                            <Element.Label htmlFor="displayName" labelFor="Nome" />
                            <Element.Error field="displayName" />
                        </Element.Field>
                        <Element.Field>
                            <Element.Textarea name="message" defaultValue={user.message} />
                            <Element.Label htmlFor="message" labelFor="Mensagem" />
                            <Element.Error field="message" />
                        </Element.Field>
                    </div>
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