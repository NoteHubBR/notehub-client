import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { forwardRef, useState } from "react";
import { handleFieldErrors, Note, NoteUpdateFormData, noteUpdateFormSchema, Token } from "@/core";
import { useNotes, useServices, useTags } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onPortalClose?: () => void;
    closeRef?: React.RefObject<HTMLButtonElement>;
    token: Token | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ onPortalClose, closeRef, token, note, setNote, ...rest }, ref) => {

    const { noteService: { updateNote } } = useServices();

    const { updateNote: updateNoteContext } = useNotes();
    const { setNewTags } = useTags();

    const updateNoteForm = useForm<NoteUpdateFormData>({
        resolver: zodResolver(noteUpdateFormSchema)
    })

    const { handleSubmit, setError } = updateNoteForm;

    const [isPending, setIsPending] = useState<boolean>(false);

    const onSubmit = async (data: NoteUpdateFormData): Promise<void> => {
        if (token) {
            try {
                setIsPending(true);
                await updateNote(token.access_token, note.id, data);
                updateNoteContext(note.id, data);
                setNewTags(data.tags);
                setNote(prev => {
                    if (prev) return {
                        ...prev,
                        title: data.title,
                        description: data.description,
                        tags: data.tags,
                        closed: data.closed,
                        hidden: data.hidden,
                        modified: true,
                        modified_at: "now"
                    }
                    return null
                })
                onPortalClose?.();
            } catch (errors) {
                if (Array.isArray(errors)) handleFieldErrors(errors, setError);
            } finally {
                setIsPending(false);
            }
        }
    }

    const { Fieldset, Label, InputText, InputTags, InputCheck, Error, Button } = Element;

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
                        <InputText name="description" defaultValue={note.description} />
                        <Error field="description" />
                    </Fieldset>
                    <Fieldset className="relative">
                        <Label htmlFor="tags">Tags</Label>
                        <InputTags name="tags" noteTags={note.tags} />
                        <Error field="tags" />
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
                        disabled={isPending}
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