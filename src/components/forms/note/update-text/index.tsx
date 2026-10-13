import { clsx } from 'clsx';
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { IconArrowsMaximize, IconArrowsMinimize, IconCheck, IconDotsVertical, IconEdit, IconHistory, IconPictureInPicture, IconTrash, IconX } from "@tabler/icons-react";
import { Menu, MenuItem } from "@/components/menu";
import { Note, NoteTextUpdateFormData, noteTextUpdateFormSchema, Token } from "@/core"
import { useApi, useDrafts, useNotes, useTags } from "@/data/hooks";
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { useShortcuts } from './shortcuts';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    ref: React.RefObject<HTMLFormElement>;
    token: Token | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    author: string | null;
    currentUser: string | null;
    fullscreenSupported: boolean;
    isFullscreen: boolean;
    toggleFullscreen: () => void;
    pipWindowSupported: boolean;
    pipWindow: Window | null;
    openPiP: (width?: number, height?: number) => Promise<void>
}

export const Form = ({ ref, token, note, setNote, author, currentUser, fullscreenSupported, isFullscreen, toggleFullscreen, pipWindowSupported, pipWindow, openPiP, ...rest }: FormProps) => {

    const {
        noteService: { updateNoteText, deleteNote },
        withProgress
    } = useApi();
    const qc = useQueryClient();

    const { setDrafts, getDraft, removeDraft } = useDrafts();
    const { setNoteToFirst, removeNote } = useNotes();
    const { removeTags } = useTags();

    const draft = getDraft('notes', note.id, note.user ? note.user.username : undefined);

    const updateNoteForm = useForm<NoteTextUpdateFormData>({
        resolver: zodResolver(noteTextUpdateFormSchema),
        defaultValues: {
            markdown: note.markdown ?? ""
        }
    })

    const { handleSubmit, setValue } = updateNoteForm;

    const isAuthor = author ? author === currentUser : false;

    const [initialText, setInitialText] = useState<string>(note.markdown ?? "");
    const [text, setText] = useState<string>(initialText);
    const [skipDraft, setSkipDraft] = useState<boolean>(draft ? false : true);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (data: NoteTextUpdateFormData): Promise<void> => {
        if (token) {
            setIsPending(true);
            await withProgress(() => updateNoteText(token.access_token, note.id, data))
                .then(() => {
                    setIsSubmiting(false);
                    setIsEditing(false);
                    setNote(prev => prev ? { ...prev, markdown: data.markdown } : null);
                    setText(data.markdown);
                    setInitialText(data.markdown);
                    setIsPreviewing(false);
                    setNoteToFirst(note.id);
                    setIsPending(false);
                    if (note.user) removeDraft('notes', note.id, note.user.username);
                })
            return await qc.invalidateQueries({ queryKey: ['note', token.access_token, note.id] });
        }
    }

    const handleDeleteNote = async (e?: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        if (e) e.stopPropagation();
        if (token && note.user) {
            setIsPending(true);
            await withProgress(() => deleteNote(token.access_token, note.id))
                .then(() => {
                    setIsPending(false);
                    removeTags(note.tags);
                    removeNote(note.id);
                    if (note.user) removeDraft('notes', note.id, note.user.username);
                })
            await Promise.all([
                qc.invalidateQueries({ queryKey: ['userNotes', token.access_token] }),
                qc.invalidateQueries({ queryKey: ['userTags', token.access_token] }),
                qc.invalidateQueries({ queryKey: ['searchNotes'] }),
                qc.invalidateQueries({ queryKey: ['searchTags'] }),
                qc.invalidateQueries({ queryKey: ['note', token.access_token, note.user.username, note.name] })
            ])
            return router.push(`/${currentUser}/notes`);
        }
    }

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const togglePreview = () => setIsPreviewing(prev => !prev);

    const openPictureInPicture = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        openPiP();
        return;
    }

    const startEdit = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsEditing(true);
        setIsPreviewing(false);
        return;
    }

    const startSubmit = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsSubmiting(true);
        return;
    }

    const startDelete = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        toggleMenu();
        setIsDeleting(true);
        return;
    }

    const startDraft = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (draft) {
            setSkipDraft(true);
            setValue('markdown', draft.content);
            setText(draft.content);
            setIsEditing(true);
            setIsPreviewing(false);
        }
        return;
    }

    const saveDraft = (content: string) => {
        if (isAuthor && note.user) {
            if (content === initialText) return;
            setSkipDraft(true);
            return setDrafts(
                'notes', {
                [note.id]: {
                    content,
                    savedAt: Date.now()
                }
            }, note.user.username)
        }
        return;
    }

    const cancelEdit = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSkipDraft(false);
        setValue('markdown', initialText);
        setText(initialText);
        setIsEditing(false);
        setIsPreviewing(false);
        return;
    }

    useShortcuts({
        ref,
        isAuthor,
        isEditing,
        onFullscreen: toggleFullscreen,
        onPictureInPicture: openPictureInPicture,
        onStartEdit: startEdit,
        onCancel: cancelEdit,
        onDelete: handleDeleteNote,
        onSave: handleSubmit(onSubmit)
    })

    const { Title, EditingTitle, ActionButton, Dialog, MdEditor, MdPreview } = Element;

    return (
        <FormProvider {...updateNoteForm}>
            <form
                ref={ref}
                id="note"
                onSubmit={handleSubmit(onSubmit)}
                className={clsx(
                    'scroll-mt-[9vh] inmd:scroll-mt-0',
                    'min-w-0 flex flex-col flex-1 dark:bg-darker bg-lighter',
                    isFullscreen
                        ? 'h-screen w-screen'
                        : [
                            'relative rounded-[5px] border inmd:dark:border-none dark:border-middark/50 border-midlight/50',
                            pipWindow
                                ? 'min-h-screen'
                                : 'min-h-[90vh] max-h-[90vh] inmd:min-h-[93.25svh] inmd:max-h-[93.25svh]'
                        ],
                    'flex flex-col flex-1',
                    'dark:bg-darker bg-lighter',
                )}
                {...rest}
            >
                <header className="px-4 inmd:px-2 flex items-center justify-between gap-3 border-b dark:border-middark/50 border-midlight/50">
                    <div className="overflow-hidden w-fit flex gap-3">
                        <Title
                            title={note.name}
                            disabled={!isPreviewing}
                            onClick={togglePreview}
                            isPreviewing={isPreviewing}
                        >
                            {isEditing ? "Editar" : note.name}
                        </Title>
                        <EditingTitle
                            disabled={isPreviewing}
                            onClick={togglePreview}
                            isPreviewing={isPreviewing}
                            isEditing={isEditing}
                        >
                            Visualizar
                        </EditingTitle>
                    </div>
                    <div className="flex gap-3">
                        {skipDraft ? null :
                            <ActionButton
                                isAuthor={isAuthor}
                                type="button"
                                onClick={startDraft}
                                isEditing={isEditing}
                                icon={IconHistory}
                                tooltip="Rascunho"
                                className="dark:bg-semilight/20 bg-semidark/20 dark:hover:bg-semilight/10 hover:bg-semidark/10"
                            />
                        }
                        <ActionButton
                            isAuthor={isAuthor}
                            type="button"
                            onClick={cancelEdit}
                            isEditing={isEditing}
                            icon={IconX}
                            tooltip="Cancelar"
                            className="dark:bg-semilight/20 bg-semidark/20 dark:hover:bg-semilight/10 hover:bg-semidark/10"
                        />
                        {fullscreenSupported && !pipWindow ?
                            <ActionButton
                                skipAuthorityCheck
                                type="button"
                                onClick={toggleFullscreen}
                                isEditing={!isEditing}
                                icon={isFullscreen ? IconArrowsMinimize : IconArrowsMaximize}
                                tooltip={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                                className="dark:hover:bg-semilight/10 hover:bg-semidark/10 dark:focus:bg-semilight/10 focus:bg-semidark/10"
                            />
                            : null
                        }
                        {pipWindowSupported && !pipWindow && !isFullscreen
                            ? <ActionButton
                                skipAuthorityCheck
                                type="button"
                                onClick={openPictureInPicture}
                                isEditing={!isEditing}
                                icon={IconPictureInPicture}
                                tooltip="Picture-in-Picture"
                                className="dark:hover:bg-semilight/10 hover:bg-semidark/10 dark:focus:bg-semilight/10 focus:bg-semidark/10"
                            />
                            : null
                        }
                        <ActionButton
                            isAuthor={isAuthor}
                            type="button"
                            onClick={startSubmit}
                            isEditing={isEditing}
                            icon={IconCheck}
                            tooltip="Salvar"
                            className="text-white bg-primary hover:bg-secondary"
                        />
                        <ActionButton
                            isAuthor={isAuthor}
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
                </header>
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
                <MdPreview
                    isEditing={isEditing}
                    isPreviewing={isPreviewing}
                    isFullscreen={isFullscreen}
                    markdown={isPreviewing ? text : initialText}
                />
                <MdEditor
                    isEditing={isEditing}
                    isPreviewing={isPreviewing}
                    onDraftChange={saveDraft}
                    setText={setText}
                    value={text}
                />
            </form>
        </FormProvider>
    )

}