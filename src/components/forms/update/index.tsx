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
    onPortalClose?: () => void;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ closeRef, onPortalClose, ...rest }, ref) => {

    const { userService: { updateUser } } = useServices();

    const { token, user, updateUser: editUser } = useUser();

    const editUserForm = useForm<EditUserFormData>({
        resolver: zodResolver(editUserFormSchema)
    })

    const { handleSubmit, setError } = editUserForm;

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const onSubmit = async (data: EditUserFormData) => {

        if (!token || !user) return;

        startTransition(async () => {

            const newData = { ...data };
            const shouldUpdateAvatar = user.avatar !== data.avatar;
            const shouldUpdateBanner = user.banner !== data.banner;

            try {

                const [avatarPromise, bannerPromise] = [
                    shouldUpdateAvatar
                        ? storeImg({ folder: "avatars", username: data.username, blobUrl: data.avatar! })
                        : Promise.resolve(user.avatar),
                    shouldUpdateBanner
                        ? storeImg({ folder: "banners", username: data.username, blobUrl: data.banner! })
                        : Promise.resolve(user.banner)
                ]

                const [avatar, banner] = await Promise.all([
                    avatarPromise.catch(() => null),
                    bannerPromise.catch(() => null)
                ])

                if (avatar) newData.avatar = avatar;
                if (banner) newData.banner = banner;

                const updated = await updateUser(token.access_token, newData);

                await Promise.allSettled([
                    shouldUpdateAvatar && deleteImage(user.avatar),
                    shouldUpdateBanner && deleteImage(user.banner)
                ])

                editUser(updated);
                onPortalClose?.();
                return router.push(`/${data.username}`);

            } catch (errors) {
                await Promise.allSettled([
                    shouldUpdateAvatar && deleteImage(newData.avatar!),
                    shouldUpdateBanner && deleteImage(newData.banner!)
                ])
                if (Array.isArray(errors)) handleFieldErrors(errors, setError);
            }

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
                    Salvar
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