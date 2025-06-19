import { CreateNoteFormData, createNoteFormSchema, handleFieldErrors } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { IconEyeClosed, IconMessage, IconMessageOff, IconWorld } from "@tabler/icons-react";
import { useNotes, useServices } from "@/data/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = ({ token, username }: { token: string; username: string; }) => {

    const { noteService: { createNote } } = useServices();

    const { setNewNote } = useNotes();

    const createNoteForm = useForm<CreateNoteFormData>({
        resolver: zodResolver(createNoteFormSchema)
    })

    const { handleSubmit, setError } = createNoteForm;

    const [isPending, setIsPending] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (data: CreateNoteFormData): Promise<void> => {
        try {
            setIsPending(true);
            const note = await createNote(token, data);
            setNewNote(note);
            router.push(`/${username}/${note.id}`);
        } catch (errors) {
            if (Array.isArray(errors)) handleFieldErrors(errors, setError);
        } finally {
            setIsPending(false);
        }
    }

    const { Section, Fieldset, FileFieldset, Legend, Label, InputText, InputRadio, Error, Info, Submit } = Element;

    return (
        <FormProvider {...createNoteForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col"
            >
                <Section>
                    <h2 className="pl-1 text-sm dark:text-midlight/65 text-middark/65">
                        Campos obrigatórios estão marcados com *
                    </h2>
                </Section>
                <Section className="gap-3">
                    <Fieldset className="relative">
                        <Label htmlFor="title" tip="*" className="block">Título</Label>
                        <InputText required name="title" countPosition="half" className="w-1/2 insm:w-full" />
                        <Error field="title" />
                    </Fieldset>
                    <Fieldset className="relative">
                        <Label htmlFor="description" tip="(opcional)" className="block">Descrição</Label>
                        <InputText name="description" countPosition="full" className="w-full" />
                        <Error field="description" />
                    </Fieldset>
                </Section>
                <Section className="gap-6">
                    <Fieldset className="p-2 pb-4 rounded-md border dark:border-middark border-midlight">
                        <Legend tip="*">Visiblidade</Legend>
                        <InputRadio id="hiddenFalse" name="hidden" value="false" defaultChecked />
                        <Label htmlFor="hiddenFalse" icon={IconWorld} className="cursor-pointer mr-3">Pública</Label>
                        <InputRadio id="hiddenTrue" name="hidden" value="true" />
                        <Label htmlFor="hiddenTrue" icon={IconEyeClosed} className="cursor-pointer">Oculta</Label>
                    </Fieldset>
                    <Fieldset className="p-2 pb-4 rounded-md border dark:border-middark border-midlight">
                        <Legend tip="*">Comentários</Legend>
                        <InputRadio id="closedFalse" name="closed" value="false" defaultChecked />
                        <Label htmlFor="closedFalse" icon={IconMessage} className="cursor-pointer mr-3">Abertos</Label>
                        <InputRadio id="closedTrue" name="closed" value="true" />
                        <Label htmlFor="closedTrue" icon={IconMessageOff} className="cursor-pointer">Fechados</Label>
                    </Fieldset>
                </Section>
                <Section className="flex-1">
                    <FileFieldset name="markdown">
                        <Legend tip="(opcional)">Carregar nota</Legend>
                    </FileFieldset>
                </Section>
                <Section>
                    <Info name="hidden" />
                    <Submit disabled={isPending}>Criar nota</Submit>
                </Section>
            </form>
        </FormProvider>
    )

}