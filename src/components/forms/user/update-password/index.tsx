import { Element } from "./elements";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { handleFieldErrors, handleInvalidTokenFieldError, PasswordUpdateFormData, passwordUpdateFormSchema } from "@/core";
import { useRouter } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = ({ token }: { token: string }) => {

    const { userService: { updateUserPassword } } = useServices();
    const { clearUser } = useUser();

    const passwordUpdateForm = useForm<PasswordUpdateFormData>({
        resolver: zodResolver(passwordUpdateFormSchema),
        defaultValues: {
            disconnectAll: true,
            keepCurrentSession: false,
        }
    })

    const { handleSubmit, setError } = passwordUpdateForm;
    const disconnectAll = useWatch({ name: 'disconnectAll', control: passwordUpdateForm.control });

    const [isPending, setIsPending] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: PasswordUpdateFormData): Promise<void> => {
        try {
            setIsPending(true);
            await updateUserPassword(token, data);
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

    const { Field, Input, Label, Error, Strength, InputCheck, InputCheckLabel, Caption, Button } = Element;

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