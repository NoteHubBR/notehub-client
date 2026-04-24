import { Element } from "./elements";
import { FindSessionsFormData, findSessionsFormSchema, handleFieldErrors, handleInvalidTokenFieldError, Session } from "@/core";
import { FormProvider, useForm } from "react-hook-form";
import { useServices, useUser } from "@/data/hooks";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onSuccess?: (sessions: Session[]) => void;
}

export const Form = ({ onSuccess, ...rest }: FormProps) => {

    const { authService: { findAllSessions } } = useServices();

    const { token } = useUser();

    const findSessionsForm = useForm<FindSessionsFormData>({
        resolver: zodResolver(findSessionsFormSchema)
    })

    const { handleSubmit, setError } = findSessionsForm;

    const [isPending, setIsPending] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);

    const onSubmit = async (data: FindSessionsFormData): Promise<Session[] | void> => {
        if (token)
            try {
                setIsPending(true);
                const sessions = await findAllSessions(token.access_token, data);
                return onSuccess?.(sessions);
            } catch (error: unknown) {
                const err = error as { response: Response, data: any };
                if (Array.isArray(err.data)) return handleFieldErrors(err.data, setError);
                return handleInvalidTokenFieldError(err.data, setInvalid);
            } finally {
                setIsPending(false);
            }
    }

    const { Field, Input, Label, Error, Button } = Element;

    if (token) return (
        <FormProvider {...findSessionsForm} {...rest}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[300px] w-full mt-6"
            >
                <Field>
                    <Input name="password" />
                    <Label htmlFor="password">Senha</Label>
                </Field>
                <Field className='h-12'>
                    <Error name="password" />
                </Field>
                <Button disabled={isPending}>Acessar</Button>
                <p className={`${invalid ? 'opacity-100' : 'opacity-0'} text-red-600 transition-opacity`}>
                    Token inválido.
                </p>
            </form>
        </FormProvider>
    )

    return null;

}