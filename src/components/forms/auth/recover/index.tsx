import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { handleFieldErrors, RecoverFormData, recoverFormSchema } from "@/core";
import { IconMail } from "@tabler/icons-react";
import { useApi } from "@/data/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {

    const {
        tokenService: { sendPasswordChangeRequest },
        withProgress
    } = useApi();

    const recoverForm = useForm<RecoverFormData>({
        resolver: zodResolver(recoverFormSchema)
    })

    const { handleSubmit, setError } = recoverForm;

    const [isRequesting, setIsRequesting] = useState<boolean>();

    const router = useRouter();

    const onSubmit = async (data: RecoverFormData) => {
        setIsRequesting(true)
        try {
            await withProgress(() => sendPasswordChangeRequest(data));
            router.push('/sent')
        } catch (error: any) {
            if (error.response.status === 404) return setError("email", { message: "Conta não encontrada." });
            if (Array.isArray(error)) return handleFieldErrors(error, setError)
            return;
        } finally {
            setIsRequesting(false)
        }
    }

    return (
        <FormProvider {...recoverForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[444px] insm:w-full
                    px-4 py-4
                    flex flex-col gap-12
                    rounded-md
                    backdrop-blur-sm
                    dark:bg-primary/20 bg-indigo-600/10"
                {...props}
            >
                <Element.Header />
                <Element.Field>
                    <Element.Label htmlFor="email" tooltip="O email deve ser aquele vinculado à conta.">Email</Element.Label>
                    <Element.Input name="email" type="text" icon={<IconMail title="Email" />} />
                    <Element.Error field="email" />
                </Element.Field>
                <Element.Button isRequesting={isRequesting}>Enviar</Element.Button>
            </form>
        </FormProvider>
    )

}