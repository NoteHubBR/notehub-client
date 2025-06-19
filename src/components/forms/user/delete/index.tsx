import { DeleteUserFormData, deleteUserFormSchema, handleFieldErrors } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = () => {

    const { userService: { deleteUser } } = useServices();
    const { token, clearUser } = useUser();

    const deleteUserForm = useForm<DeleteUserFormData>({
        resolver: zodResolver(deleteUserFormSchema)
    })

    const { handleSubmit, setError } = deleteUserForm;

    const [isPending, setIsPending] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: DeleteUserFormData): Promise<void> => {
        if (token)
            try {
                setIsPending(true);
                await deleteUser(token.access_token, data);
                clearUser();
                return router.push("/");
            } catch (errors: any) {
                if (Array.isArray(errors)) return handleFieldErrors(errors, setError);
            } finally {
                setIsPending(false);
            }
    }

    const { Wrapper, Label, Input, Button, Error } = Element;

    return (
        <FormProvider {...deleteUserForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="px-2 flex flex-col gap-1">
                <Wrapper>
                    <Label name="password" />
                    <Input name="password" />
                    <Button disabled={isPending}>
                        Excluir
                    </Button>
                </Wrapper>
                <Error name="password" />
            </form>
        </FormProvider>
    )

}