import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { forwardRef, useTransition } from "react";
import { Note, NoteUpdateFormData, noteUpdateFormSchema } from "@/core";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onPortalClose?: () => void;
    closeRef?: React.RefObject<HTMLButtonElement>;
    note: Note;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ onPortalClose, closeRef, note, ...rest }, ref) => {

    const updateNoteForm = useForm<NoteUpdateFormData>({
        resolver: zodResolver(noteUpdateFormSchema)
    })

    const { handleSubmit } = updateNoteForm;

    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: NoteUpdateFormData) => startTransition(async (): Promise<void> => {
        console.log(data);
        onPortalClose?.();
    })

    const { Fieldset, Label, InputText, InputCheck, Error, Button } = Element;

    return (
        <FormProvider {...updateNoteForm}>
            <form
                ref={ref}
                onSubmit={handleSubmit(onSubmit, (errors) => console.log("Erros:", errors))}
                className="z-[998] center
                max-w-[500px] w-[95%] mx-auto rounded
                border dark:border-middark/50 border-midlight/50
                dark:bg-dark bg-light"
                {...rest}
            >
                <header className="p-4">
                    <h5>Configure sua nota</h5>
                </header>
                <section className="p-4 border-y dark:border-middark/50 border-midlight/50 dark:bg-darker/50 bg-lighter">
                    <Fieldset className="relative">
                        <Label htmlFor="title">Título</Label>
                        <InputText required name="title" defaultValue={note.title} />
                        <Error field="title" />
                    </Fieldset>
                    <Fieldset className="relative">
                        <Label htmlFor="description">Descrição</Label>
                        <InputText required name="description" defaultValue={note.description} />
                        <Error field="description" />
                    </Fieldset>
                    <Fieldset>
                        <InputCheck name="closed" defaultChecked={note.closed} />
                        <Label htmlFor="closed">Fechada</Label>
                    </Fieldset>
                    <Fieldset>
                        <InputCheck name="hidden" defaultChecked={note.hidden} />
                        <Label htmlFor="hidden">Oculta</Label>
                    </Fieldset>
                </section>
                <footer className="p-4 flex items-center gap-3 justify-end">
                    <Button
                        ref={closeRef}
                        type="button"
                        className="hover:dark:bg-black hover:bg-white focus-visible:dark:bg-black focus-visible:bg-white"
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="text-white bg-primary hover:bg-secondary focus-visible:bg-secondary"
                    >
                        Salvar alteração
                    </Button>
                </footer>
            </form>
        </FormProvider>
    )

})

Form.displayName = 'Form';