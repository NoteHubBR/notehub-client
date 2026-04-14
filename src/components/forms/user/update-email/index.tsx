import { Element } from "./elements";
import { EmailChangeFormData, emailChangeFormSchema, handleFieldErrors, handleInvalidTokenFieldError, scrollTo } from "@/core";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = ({ token }: { token: string }) => {

    const { userService: { updateUserEmail } } = useServices();
    const { clearUser } = useUser();

    const emailChangeForm = useForm<EmailChangeFormData>({
        resolver: zodResolver(emailChangeFormSchema),
        defaultValues: {
            disconnectAll: true,
            keepCurrentSession: false,
        }
    })

    const { handleSubmit, setError } = emailChangeForm;
    const disconnectAll = useWatch({ name: 'disconnectAll', control: emailChangeForm.control });

    const [isPending, setIsPending] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: EmailChangeFormData): Promise<void> => {
        try {
            setIsPending(true);
            await updateUserEmail(token, data);
            if (data.disconnectAll && !data.keepCurrentSession) clearUser();
            return router.push("/");
        } catch (error: unknown) {
            const err = error as { response: Response, data: any };
            if (Array.isArray(err.data)) return handleFieldErrors(err.data, setError);
            return handleInvalidTokenFieldError(err.data, setInvalid);
        } finally {
            setIsPending(false);
        }
    }

    const { Field, Input, Label, InputCheck, InputCheckLabel, Caption, Error, Button } = Element;

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
                <Field className='-my-4'>
                    <InputCheck name='disconnectAll' defaultChecked={true} />
                    <InputCheckLabel htmlFor="disconnectAll">Desconectar todas as sessões</InputCheckLabel>
                </Field>
                <Field className='-my-4'>
                    <InputCheck name='keepCurrentSession' disabled={!disconnectAll} defaultChecked={false} />
                    <InputCheckLabel htmlFor="keepCurrentSession">Manter sessão atual</InputCheckLabel>
                </Field>
                <Caption scrollTo='sessions'>
                    Gerencie os dispositivos conectados à sua conta.
                </Caption>
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