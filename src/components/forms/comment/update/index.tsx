import { clsx } from "clsx";
import { Comment, CreateCommentFormData, createCommentFormSchema, handleFieldErrors, Note, Page, Reply, Token, User } from "@/core";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { IconEdit, IconX } from "@tabler/icons-react";
import { Menu, MenuButton, MenuItem } from "@/components/menu";
import { useRef, useState, useTransition } from "react";
import { useServices } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    token: Token | null;
    user: User | null;
    note: Note;
    comment: Comment;
    repliesCount: number;
    isRepliesListOpen: boolean;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setRepliesPage: React.Dispatch<React.SetStateAction<Omit<Page<Reply>, 'content'>>>;
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
    setIsRepliesListOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Form = ({
    token,
    user,
    note,
    comment,
    repliesCount,
    isRepliesListOpen,
    setNote,
    setComments,
    setRepliesPage,
    setReplies,
    setIsReplying,
    setIsRepliesListOpen,
    ...rest }: FormProps) => {

    const { commentService: { editComment, deleteComment }, replyService: { getReplies } } = useServices();

    const editCommentForm = useForm<CreateCommentFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    const { handleSubmit, setError } = editCommentForm;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [initialText, setInitialText] = useState<string>(comment.text);
    const [current, setCurrent] = useState<string>(initialText);
    const [modified, setModified] = useState<boolean>(comment.modified);
    const [hasFetchedRepliesList, setHasFetchedRepliesList] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [isPending, startTransition] = useTransition();
    const [isRepliesFetchPending, startRepliesTransition] = useTransition();

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const toggleIsExpanded = () => setIsExpanded(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const startEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        const txtElement = textareaRef.current;
        if (txtElement) {
            const length = txtElement.value.length;
            txtElement.focus();
            txtElement.setSelectionRange(length, length);
            setReadOnly(false);
            setIsTyping(true);
            return;
        }
    }

    const cancelEdit = () => {
        setReadOnly(true);
        setIsTyping(false);
        setCurrent(initialText);
        setIsExpanded(true);
    }

    const startDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleMenu();
        setIsDeleting(true);
        return;
    }

    const openReplyBox = () => setIsReplying(true);

    const openRepliesList = () => startRepliesTransition(async () => {
        if (hasFetchedRepliesList) return setIsRepliesListOpen(prev => !prev);
        try {
            const accessToken = token ? token.access_token : null;
            const { content, ...rest } = await getReplies(accessToken, comment.id, 'page=0');
            setRepliesPage(rest);
            setReplies(content);
            setIsRepliesListOpen(prev => !prev);
            setHasFetchedRepliesList(true);
        } catch (error) {
            throw error;
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrent(e.target.value);

    const onSubmit = (data: CreateCommentFormData) => startTransition(async (): Promise<void> => {
        try {
            if (token) {
                await editComment(token.access_token, comment.id, data);
                setInitialText(data.text);
                setCurrent(data.text);
                setReadOnly(true);
                setIsTyping(false);
                setModified(true);
                setIsExpanded(true);
            }
        } catch (errors) {
            if (Array.isArray(errors)) return handleFieldErrors(errors, setError);
        }
    })

    const handleDeleteComment = () => startTransition(async () => {
        if (token) {
            await deleteComment(token.access_token, comment.id);
            setComments(prev => prev.filter((c) => c.id != comment.id));
            setNote((prev) => {
                if (prev) return { ...prev, comments_count: prev.comments_count - 1 };
                else return null;
            })
        }
    })

    const { User, Username, Time, Fieldset, Text, Label, Error, Button, ChevronIcon, Dialog } = Element;

    return (
        <FormProvider {...editCommentForm}>
            <form
                {...rest}
                onSubmit={handleSubmit(onSubmit)}
                className="relative py-4 last:pb-0"
            >
                {comment.user && comment.user.username === user?.username && readOnly &&
                    <MenuButton
                        disabled={isPending}
                        onClick={toggleMenu}
                        onBlur={closeMenu}
                        tooltip="Menu"
                        className="absolute top-4 right-0 z-20"
                    >
                        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} className="top-auto bottom-[135%]">
                            <MenuItem
                                onClick={startEdit}
                                shouldHide={note.closed}
                                icon={IconEdit}
                                className="dark:hover:text-secondary hover:text-primary"
                            >
                                Editar
                            </MenuItem>
                            <MenuItem
                                onClick={startDelete}
                                icon={IconX}
                                className="hover:text-red-500"
                            >
                                Apagar
                            </MenuItem>
                        </Menu>
                    </MenuButton>
                }
                <header className="relative flex gap-2">
                    <User comment={comment} />
                    <div className="overflow-hidden w-full">
                        <div className="insm:max-w-[85%] flex items-baseline gap-1">
                            <Username comment={comment} />
                            <Time comment={comment} modified={modified} />
                        </div>
                        <Fieldset readOnly={readOnly}>
                            <Text
                                readOnly={readOnly}
                                ref={textareaRef}
                                name="text"
                                isExpanded={isExpanded}
                                toggleIsExpanded={toggleIsExpanded}
                                value={current}
                                onChange={handleChange}
                            />
                            <Label>Adicione um comentário</Label>
                        </Fieldset>
                    </div>
                </header>
                {isTyping
                    ?
                    <footer className="pt-2 flex items-center justify-between">
                        <Error field="text" />
                        <div className="w-full flex items-center gap-1 justify-end">
                            <Button
                                disabled={isPending}
                                type="button"
                                onClick={cancelEdit}
                                className="dark:hover:bg-lighter/10 hover:bg-darker/10"
                            >
                                Cancelar
                            </Button>
                            <Button
                                disabled={isPending || current.length < 1}
                                isPending={isPending}
                                type="submit"
                                className={clsx(
                                    current.length > 0
                                        ? 'text-white dark:bg-secondary bg-primary hover:dark:bg-primary hover:bg-secondary'
                                        : 'dark:text-midlight text-middark dark:bg-lighter/25 bg-darker/25',
                                )}
                            >
                                Salvar
                            </Button>
                        </div>
                    </footer>
                    :
                    <footer className="pl-10 flex items-center">
                        {user && !note.closed &&
                            <Button
                                type="button"
                                onClick={openReplyBox}
                                className="font-medium dark:text-neutral-400 text-neutral-600 dark:hover:bg-lighter/10 hover:bg-darker/10"
                            >
                                Responder
                            </Button>
                        }
                        <Button
                            type="button"
                            disabled={repliesCount < 1}
                            isPending={isRepliesFetchPending}
                            onClick={openRepliesList}
                            className="flex items-center gap-1 font-medium dark:text-secondary text-primary dark:hover:secondary/20 hover:bg-primary/20"
                        >
                            {repliesCount > 0
                                ? repliesCount > 1
                                    ? <ChevronIcon isRepliesListOpen={isRepliesListOpen} repliesCount={repliesCount} />
                                    : <ChevronIcon isRepliesListOpen={isRepliesListOpen} repliesCount={repliesCount} />
                                : "Nenhuma respota"
                            }
                        </Button>
                    </footer>
                }
                <Dialog
                    disabled={isPending}
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                    onClick={handleDeleteComment}
                />
            </form>
        </FormProvider>
    )

}