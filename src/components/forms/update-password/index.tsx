import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { handleFieldErrors, handleInvalidTokenFieldError, PasswordUpdateFormData, passwordUpdateFormSchema } from "@/core";
import { useRouter } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = ({ token }: { token: string }) => {

    const { userService: { updateUserPassword } } = useServices();
    const { clearUser } = useUser();

    const passwordUpdateForm = useForm<PasswordUpdateFormData>({
        resolver: zodResolver(passwordUpdateFormSchema)
    })

    const { handleSubmit, setError } = passwordUpdateForm;

    const [isPending, startTransition] = useTransition();
    const [invalid, setInvalid] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = (data: PasswordUpdateFormData) => startTransition(async (): Promise<void> => {
        try {
            await updateUserPassword(token, data);
            clearUser();
            return router.push("/");
        } catch (errors: any) {
            if (Array.isArray(errors)) return handleFieldErrors(errors, setError);
            return handleInvalidTokenFieldError(errors, setInvalid);
        }
    })

    const { Field, Input, Label, Error, Strength, Button } = Element;

    return (
        <FormProvider {...passwordUpdateForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[300px] w-full mt-6 inmd:mx-auto flex flex-col gap-10"
            >
                <Field>
                    <Input name="password" />
                    <Label htmlFor="password">Senha</Label>
                    <Strength field="password" />
                    <Error name="password" />
                </Field>
                <Field>
                    <Input name="repeatPassword" />
                    <Label htmlFor="repeatPassword">Repetir senha</Label>
                    <Error name="repeatPassword" />
                </Field>
                <Button disabled={isPending}>
                    Definir
                </Button>
                <p className={`${invalid ? 'opacity-100' : 'opacity-0'} text-red-600 transition-opacity`}>
                    Token inválido.
                </p>
            </form>
        </FormProvider>
    )

}