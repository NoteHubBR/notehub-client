import { clsx } from 'clsx';
import { Element } from './elements';
import { FormProvider, useForm } from 'react-hook-form';
import { IconArrowsMaximize, IconArrowsMinimize, IconCheck, IconDotsVertical, IconEdit, IconHistory, IconKey, IconPictureInPicture, IconTrash, IconX } from '@tabler/icons-react';
import { Menu, MenuItem } from '@/components/menu';
import { Note, NoteSecret, NoteTextUpdateFormData, noteTextUpdateFormSchema, Token, UpdateNotePassphraseFormData, updateNotePassphraseFormSchema } from '@/core'
import { useApi, useCrypto, useDrafts, useNotes, useTags } from '@/data/hooks';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useShortcuts } from './shortcuts';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    ref: React.RefObject<HTMLFormElement>;
    token: Token | null;
    isLocked: boolean;
    secret: NoteSecret | null;
    setSecret: React.Dispatch<React.SetStateAction<NoteSecret | null>>;
    pendingConfiguration: boolean;
    setPendingConfiguration: React.Dispatch<React.SetStateAction<boolean>>;
    onConfiguration: boolean;
    setOnConfiguration: React.Dispatch<React.SetStateAction<boolean>>;
    pendingEdition: boolean;
    setPendingEdition: React.Dispatch<React.SetStateAction<boolean>>;
    onEdition: boolean;
    setOnEdition: React.Dispatch<React.SetStateAction<boolean>>;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    author: string | null;
    currentUser: string | null;
    displaytext: string;
    fullscreenSupported: boolean;
    isFullscreen: boolean;
    toggleFullscreen: () => void;
    pipWindowSupported: boolean;
    pipWindow: Window | null;
    openPiP: (width?: number, height?: number) => Promise<void>
}

export const Form = ({
    ref,
    token,
    isLocked,
    secret,
    setSecret,
    pendingConfiguration,
    onConfiguration,
    setPendingConfiguration,
    setOnConfiguration,
    pendingEdition,
    setPendingEdition,
    onEdition,
    setOnEdition,
    note,
    setNote,
    author,
    currentUser,
    displaytext,
    fullscreenSupported,
    isFullscreen,
    toggleFullscreen,
    pipWindowSupported,
    pipWindow,
    openPiP,
    ...rest
}: FormProps) => {

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
            markdown: note.markdown ?? ''
        }
    })

    const { handleSubmit, setValue } = updateNoteForm;

    const passphraseForm = useForm<UpdateNotePassphraseFormData>({
        resolver: zodResolver(updateNotePassphraseFormSchema),
        defaultValues: { passphrase: '' },
    })

    const {
        handleSubmit: handlePassphraseSubmit,
        setError: setPassphraseError,
        reset: resetPassphraseForm,
    } = passphraseForm;

    const isAuthor = author ? author === currentUser : false;

    const initialText = displaytext;
    const [text, setText] = useState<string>(initialText);
    const [skipDraft, setSkipDraft] = useState<boolean>(note.encrypted ? true : draft ? false : true);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
    const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { isCrypting, encrypt, decrypt } = useCrypto();
    const [isPending, setIsPending] = useState<boolean>(false);
    const busy = isPending || isCrypting;

    const router = useRouter();

    const handleDecryption = async (data: UpdateNotePassphraseFormData, e?: React.BaseSyntheticEvent) => {
        if (e) e.stopPropagation();
        if (note.markdown) try {
            const plaintext = await decrypt(note.markdown, data.passphrase);
            resetPassphraseForm();
            setSecret({
                id: note.id,
                passphrase: data.passphrase,
                plaintext,
                cipher: note.markdown,
            })
            if (pendingConfiguration) setOnConfiguration(true);
            if (pendingEdition) { setOnEdition(true); setIsPreviewing(false); }
            setIsDecrypting(false);
        } catch {
            setPassphraseError('passphrase', { message: 'Segredo incorreto.' });
        }
    }

    const onSubmit = async (data: NoteTextUpdateFormData): Promise<void> => {
        if (token) {
            if (note.encrypted) if (isLocked) return startDecryption();
            setIsPending(true);
            const currentSecret = secret;
            try {
                const markdown = currentSecret && note.encrypted
                    ? await encrypt(data.markdown, currentSecret.passphrase)
                    : data.markdown;
                await withProgress(() => updateNoteText(token.access_token, note.id, { ...data, markdown }));
                if (currentSecret && note.encrypted) setSecret({ ...currentSecret, plaintext: data.markdown, cipher: markdown });
                setNote(prev => prev ? { ...prev, markdown } : null);
                setIsSubmitting(false);
                setOnEdition(false);
                setIsPreviewing(false);
                setNoteToFirst(note.id);
                if (note.user) removeDraft('notes', note.id, note.user.username);
                return await qc.invalidateQueries({ queryKey: ['note', token.access_token, note.id] });
            } finally {
                setIsPending(false);
            }
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

    const startDecryption = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (note.encrypted) {
            if (secret) return;
            setIsMenuOpen(false);
            setIsDecrypting(true);
            return;
        }
    }

    const startEdit = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (note.encrypted) if (!secret) {
            setPendingEdition(true);
            return startDecryption();
        }
        setOnEdition(true);
        setIsPreviewing(false);
    }

    const startSubmit = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsSubmitting(true);
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
            setOnEdition(true);
            setIsPreviewing(false);
        }
        return;
    }

    const saveDraft = (content: string) => {
        if (note.encrypted) return;
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
        setOnEdition(false);
        setIsPreviewing(false);
        return;
    }

    useEffect(() => {
        setText(displaytext);
        setValue('markdown', displaytext);
    }, [displaytext])

    useEffect(() => {
        if (pendingConfiguration) startDecryption();
    }, [pendingConfiguration])

    useEffect(() => {
        if (!isDecrypting) {
            setPendingConfiguration(false);
            setPendingEdition(false);
        }
    }, [isDecrypting])

    useShortcuts({
        ref,
        isAuthor,
        isEditing: onEdition,
        onFullscreen: toggleFullscreen,
        onPictureInPicture: openPictureInPicture,
        onStartDecryption: startDecryption,
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
                id='note'
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
                <header className='px-4 inmd:px-2 flex items-center justify-between gap-3 border-b dark:border-middark/50 border-midlight/50'>
                    <div className='overflow-hidden w-fit flex gap-3'>
                        <Title
                            title={note.name}
                            disabled={!isPreviewing}
                            onClick={togglePreview}
                            isPreviewing={isPreviewing}
                        >
                            {onEdition ? 'Editar' : note.name}
                        </Title>
                        <EditingTitle
                            disabled={isPreviewing}
                            onClick={togglePreview}
                            isPreviewing={isPreviewing}
                            isEditing={onEdition}
                        >
                            Visualizar
                        </EditingTitle>
                    </div>
                    <div className='flex gap-3'>
                        {note.encrypted || skipDraft ? null :
                            <ActionButton
                                isAuthor={isAuthor}
                                type='button'
                                onClick={startDraft}
                                isEditing={onEdition}
                                icon={IconHistory}
                                tooltip='Rascunho'
                                className='dark:bg-semilight/20 bg-semidark/20 dark:hover:bg-semilight/10 hover:bg-semidark/10'
                            />
                        }
                        <ActionButton
                            isAuthor={isAuthor}
                            type='button'
                            onClick={cancelEdit}
                            isEditing={onEdition}
                            icon={IconX}
                            tooltip='Cancelar'
                            className='dark:bg-semilight/20 bg-semidark/20 dark:hover:bg-semilight/10 hover:bg-semidark/10'
                        />
                        {fullscreenSupported && !pipWindow ?
                            <ActionButton
                                skipAuthorityCheck
                                type='button'
                                onClick={toggleFullscreen}
                                isEditing={!onEdition}
                                icon={isFullscreen ? IconArrowsMinimize : IconArrowsMaximize}
                                tooltip={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                                className='dark:hover:bg-semilight/10 hover:bg-semidark/10 dark:focus:bg-semilight/10 focus:bg-semidark/10'
                            />
                            : null
                        }
                        {pipWindowSupported && !pipWindow && !isFullscreen
                            ? <ActionButton
                                skipAuthorityCheck
                                type='button'
                                onClick={openPictureInPicture}
                                isEditing={!onEdition}
                                icon={IconPictureInPicture}
                                tooltip='Picture-in-Picture'
                                className='dark:hover:bg-semilight/10 hover:bg-semidark/10 dark:focus:bg-semilight/10 focus:bg-semidark/10'
                            />
                            : null
                        }
                        {note.encrypted
                            ? <ActionButton
                                disabled={secret ? secret.passphrase ? true : false : false}
                                skipAuthorityCheck
                                type='button'
                                onClick={startDecryption}
                                isEditing={!onEdition}
                                icon={IconKey}
                                tooltip={secret ? 'Descriptografada' : 'Descriptografar'}
                                className={clsx(
                                    'disabled:cursor-default',
                                    secret
                                        ? 'dark:text-secondary text-primary'
                                        : 'dark:text-light text-dark',
                                    'dark:hover:text-secondary hover:text-primary',
                                )}
                            />
                            : null
                        }
                        <ActionButton
                            isAuthor={isAuthor}
                            type='button'
                            onClick={startSubmit}
                            isEditing={onEdition}
                            icon={IconCheck}
                            tooltip='Salvar'
                            className='text-white bg-primary hover:bg-secondary'
                        />
                        <ActionButton
                            isAuthor={isAuthor}
                            type='button'
                            disabled={busy}
                            onClick={toggleMenu}
                            onBlur={closeMenu}
                            isEditing={!onEdition}
                            icon={IconDotsVertical}
                            tooltip='Menu'
                            className='relative dark:hover:bg-semilight/10 hover:bg-semidark/10 dark:focus:bg-semilight/10 focus:bg-semidark/10'
                        >
                            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
                                <MenuItem
                                    onClick={startEdit}
                                    onMouseDown={(e) => e.preventDefault()}
                                    icon={IconEdit}
                                    className='dark:hover:text-secondary hover:text-primary'
                                >
                                    Editar
                                </MenuItem>
                                <MenuItem
                                    onClick={startDelete}
                                    onMouseDown={(e) => e.preventDefault()}
                                    icon={IconTrash}
                                    className='hover:text-red-500'
                                >
                                    Apagar
                                </MenuItem>
                            </Menu>
                        </ActionButton>
                    </div>
                </header>
                <FormProvider {...passphraseForm}>
                    <Dialog
                        msg='Insira o segredo.'
                        desc='Sua chave secreta não será enviada aos nossos servidores em nenhuma circunstância.'
                        usePassphrase
                        opt={isCrypting ? 'Concluindo...' : 'Concluir'}
                        type='button'
                        isOpen={isDecrypting}
                        setIsOpen={setIsDecrypting}
                        disabled={busy}
                        onClick={handlePassphraseSubmit(handleDecryption)}
                        onEnter={handlePassphraseSubmit(handleDecryption)}
                        className='dark:text-secondary text-primary
                        dark:hover:bg-secondary hover:bg-primary
                        dark:focus-visible:bg-secondary focus-visible:bg-primary
                        dark:disabled:bg-secondary disabled:bg-primary'
                    />
                </FormProvider>
                <Dialog
                    msg='Tem certeza de que deseja apagar esta nota?'
                    desc='Esta ação é irreversível e todos os dados serão perdidos permanentemente.'
                    opt={busy ? 'Apagando...' : 'Sim, apagar'}
                    type='button'
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                    disabled={busy}
                    onClick={handleDeleteNote}
                    className='dark:text-red-500 text-red-600
                    dark:hover:bg-red-500 hover:bg-red-600
                    dark:focus-visible:bg-red-500 focus-visible:bg-red-600
                    dark:disabled:bg-red-500 disabled:bg-red-600'
                />
                <Dialog
                    msg='Tem certeza de que deseja atualizar esta nota?'
                    desc='A atualização sobrescreverá o conteúdo atual. Não é possível desfazer esta operação.'
                    opt={isCrypting ? 'Criptografando...' : isPending ? 'Atualizando...' : 'Sim, atualizar'}
                    type='submit'
                    isOpen={isSubmitting}
                    setIsOpen={setIsSubmitting}
                    disabled={busy}
                    className='dark:text-secondary text-primary
                    dark:hover:bg-secondary hover:bg-primary
                    dark:focus-visible:bg-secondary focus-visible:bg-primary
                    dark:disabled:bg-secondary disabled:bg-primary'
                />
                <MdPreview
                    isEditing={onEdition}
                    isPreviewing={isPreviewing}
                    isFullscreen={isFullscreen}
                    markdown={isPreviewing ? text : initialText}
                />
                <MdEditor
                    isEditing={onEdition}
                    isPreviewing={isPreviewing}
                    onDraftChange={saveDraft}
                    setText={setText}
                    value={text}
                />
            </form>
        </FormProvider>
    )

}