import { Element } from "./elements";
import { EmailChangeFormData, emailChangeFormSchema, handleFieldErrors, handleInvalidTokenFieldError } from "@/core";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = ({ token }: { token: string }) => {

    const { userService: { updateUserEmail } } = useServices();
    const { clearUser } = useUser();

    const emailChangeForm = useForm<EmailChangeFormData>({
        resolver: zodResolver(emailChangeFormSchema)
    })

    const { handleSubmit, setError } = emailChangeForm;

    const [isPending, setIsPending] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: EmailChangeFormData): Promise<void> => {
        try {
            setIsPending(true);
            await updateUserEmail(token, data);
            clearUser();
            return router.push("/");
        } catch (errors: any) {
            if (Array.isArray(errors)) return handleFieldErrors(errors, setError);
            return handleInvalidTokenFieldError(errors, setInvalid);
        } finally {
            setIsPending(false);
        }
    }

    const { Field, Input, Label, Error, Button } = Element;

    return (
        <FormProvider {...emailChangeForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[300px] w-full mt-6 inmd:mx-auto flex flex-col gap-10"
            >
                <Field>
                    <Input name="email" />
                    <Label htmlFor="email">Email</Label>
                    <Error name="email" />
                </Field>
                <Field>
                    <Input name="repeatEmail" />
                    <Label htmlFor="repeatEmail">Repetir email</Label>
                    <Error name="repeatEmail" />
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