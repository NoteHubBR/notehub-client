import { ApiError } from '@/api';
import { DeleteUserFormData, deleteUserFormSchema, handleFieldErrors } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { useApi, useIdentities, useUser } from "@/data/hooks";
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = () => {

    const {
        userService: { deleteUser },
        withProgress
    } = useApi();
    const qc = useQueryClient();

    const { token, user, clearUser } = useUser();
    const { identities } = useIdentities();

    const deleteUserForm = useForm<DeleteUserFormData>({
        resolver: zodResolver(deleteUserFormSchema)
    })

    const { handleSubmit, setError } = deleteUserForm;

    const [isPending, setIsPending] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: DeleteUserFormData): Promise<void> => {
        if (token && user)
            try {
                setIsPending(true);
                await withProgress(() => deleteUser(token.access_token, data));
                await Promise.all([
                    qc.invalidateQueries({ queryKey: ['user', user.username] }),
                    qc.invalidateQueries({ queryKey: ['searchUsers'] }),
                ])
                clearUser({ skipLogout: true });
                return router.push("/");
            } catch (error) {
                const { data } = error as ApiError;
                if (Array.isArray(data)) return handleFieldErrors(data, setError);
            } finally {
                setIsPending(false);
            }
    }

    const { Wrapper, Label, Input, Button, Error } = Element;

    if (user) return (
        <FormProvider {...deleteUserForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="px-2 flex flex-col gap-1">
                <Wrapper>
                    <Label name="password" />
                    <Input name="password" placeholder={identities.length < 1 ? 'Digite sua senha' : 'Digite sua chave'} />
                    <Button disabled={isPending}>
                        Excluir
                    </Button>
                </Wrapper>
                <Error name="password" />
            </form>
        </FormProvider>
    )

}