import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { IconCheck, IconDotsVertical, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { Menu, MenuItem } from "@/components/menu";
import { Note, NoteTextUpdateFormData, noteTextUpdateFormSchema, Token } from "@/core"
import { useEffect, useState } from "react";
import { useNotes, useServices } from "@/data/hooks";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    token: Token | null;
    note: Note;
    author: string;
    currentUser: string | null;
}

export const Form = ({ token, note, author, currentUser, ...rest }: FormProps) => {

    const { noteService: { updateNoteText, deleteNote } } = useServices();
    const { setNoteToFirst, removeNote } = useNotes();

    const updateNoteForm = useForm<NoteTextUpdateFormData>({
        resolver: zodResolver(noteTextUpdateFormSchema),
        defaultValues: {
            markdown: note.markdown ?? ""
        }
    })

    const { handleSubmit } = updateNoteForm;

    const isAuthor = author === currentUser;

    const [initialText, setInitialText] = useState<string>(note.markdown ?? "");
    const [text, setText] = useState<string>(initialText);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPreviewing, setIsPreviewing] = useState<boolean>(true);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);

    const router = useRouter();

    const scrollToNote = () => {
        const noteEl = document.getElementById("note");
        if (noteEl) {
            noteEl.scrollIntoView({ behavior: "smooth" });
        }
    }

    const onSubmit = async (data: NoteTextUpdateFormData): Promise<void> => {
        if (token) {
            setIsPending(true);
            return await updateNoteText(token.access_token, note.id, data)
                .then(() => {
                    setIsSubmiting(false);
                    setIsEditing(false);
                    setText(data.markdown);
                    setInitialText(data.markdown);
                    setIsPreviewing(true);
                    setNoteToFirst(note.id);
                    setIsPending(false);
                })
        }
    }

    const handleDeleteNote = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation();
        if (token) {
            setIsPending(true);
            return await deleteNote(token.access_token, note.id)
                .then(() => {
                    setIsPending(false);
                    removeNote(note.id);
                    router.push(`/${currentUser}/notes`);
                })
        }
    }

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const togglePreview = () => setIsPreviewing(prev => !prev);

    const startEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        setIsPreviewing(false);
        return;
    }

    const startSubmit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSubmiting(true);
        return;
    }

    const startDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleMenu();
        setIsDeleting(true);
        return;
    }

    const cancelEdit = () => {
        setText(initialText);
        setIsEditing(false);
        setIsPreviewing(true);
        return;
    }

    useEffect(() => { scrollToNote() }, []);

    const { Title, EditingTitle, ActionButton, Text, Dialog } = Element;

    return (
        <FormProvider {...updateNoteForm}>
            <form
                id="note"
                onSubmit={handleSubmit(onSubmit)}
                className="scroll-mt-[9vh] inmd:scroll-mt-0
                relative min-h-[90vh] inmd:min-h-[100svh] rounded-[5px]
                border inmd:dark:border-none dark:border-middark/50 border-midlight/50
                flex flex-col flex-1
                dark:bg-darker bg-lighter"
                {...rest}
            >
                <header className="px-4 inmd:px-2 flex items-center justify-between gap-3 border-b dark:border-middark/50 border-midlight/50">
                    <div className="insm:overflow-hidden w-fit flex gap-3">
                        <Title
                            disabled={isPreviewing}
                            onClick={togglePreview}
                            isPreviewing={isPreviewing}
                        >
                            {note.title}
                        </Title>
                        <EditingTitle
                            disabled={!isPreviewing}
                            onClick={togglePreview}
                            isPreviewing={isPreviewing}
                            isEditing={isEditing}
                        >
                            Editando
                        </EditingTitle>
                    </div>
                    {isAuthor &&
                        <div className="flex gap-3">
                            <ActionButton
                                type="button"
                                onClick={cancelEdit}
                                isEditing={isEditing}
                                icon={IconX}
                                tooltip="Cancelar"
                                className="dark:bg-semilight/20 bg-semidark/20 dark:hover:bg-semilight/10 hover:bg-semidark/10"
                            />
                            <ActionButton
                                type="button"
                                onClick={startSubmit}
                                isEditing={isEditing}
                                icon={IconCheck}
                                tooltip="Salvar"
                                className="text-white bg-primary hover:bg-secondary"
                            />
                            <ActionButton
                                type="button"
                                disabled={isPending}
                                onClick={toggleMenu}
                                onBlur={closeMenu}
                                isEditing={!isEditing}
                                icon={IconDotsVertical}
                                tooltip="Menu"
                                className="relative dark:hover:bg-semilight/10 hover:bg-semidark/10 dark:focus:bg-semilight/10 focus:bg-semidark/10"
                            >
                                <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
                                    <MenuItem
                                        onClick={startEdit}
                                        icon={IconEdit}
                                        className="dark:hover:text-secondary hover:text-primary"
                                    >
                                        Editar
                                    </MenuItem>
                                    <MenuItem
                                        onClick={startDelete}
                                        icon={IconTrash}
                                        className="hover:text-red-500"
                                    >
                                        Apagar
                                    </MenuItem>
                                </Menu>
                            </ActionButton>
                        </div>
                    }
                </header>
                <Text
                    readOnly={isPreviewing}
                    setText={setText}
                    value={isPreviewing ? initialText : text}
                />
                <Dialog
                    msg="Tem certeza de que deseja apagar esta nota?"
                    desc="Esta ação é irreversível e todos os dados serão perdidos permanentemente."
                    opt="Sim, apagar"
                    type="button"
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                    disabled={isPending}
                    onClick={handleDeleteNote}
                    className="dark:text-red-500 text-red-600
                    dark:hover:bg-red-500 hover:bg-red-600
                    dark:disabled:bg-red-500 disabled:bg-red-600"
                />
                <Dialog
                    msg="Tem certeza de que deseja atualizar esta nota?"
                    desc="A atualização sobrescreverá o conteúdo atual. Não é possível desfazer esta operação."
                    opt="Sim, atualizar"
                    type="submit"
                    isOpen={isSubmiting}
                    setIsOpen={setIsSubmiting}
                    disabled={isPending}
                    className="dark:text-secondary text-primary
                    dark:hover:bg-secondary hover:bg-primary
                    dark:disabled:bg-secondary disabled:bg-primary"
                />
            </form>
        </FormProvider>
    )

}