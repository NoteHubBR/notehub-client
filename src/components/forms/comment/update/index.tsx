import { clsx } from "clsx";
import { Comment, CreateCommentFormData, createCommentFormSchema, handleFieldErrors, Note, Token, User } from "@/core";
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
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const Form = ({ token, user, note, comment, setNote, setComments, ...rest }: FormProps) => {

    const { commentService: { editComment, deleteComment } } = useServices();

    const createCommentForm = useForm<CreateCommentFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    const { handleSubmit, setError } = createCommentForm;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [initialText, setInitialText] = useState<string>(comment.text);
    const [current, setCurrent] = useState<string>(initialText);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [isPending, startTransition] = useTransition();

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const startEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        const txtElemenet = textareaRef.current;
        if (txtElemenet) {
            const length = txtElemenet.value.length;
            txtElemenet.focus();
            txtElemenet.setSelectionRange(length, length);
            setReadOnly(false);
            setIsTyping(true);
            return;
        }
    }

    const cancelEdit = () => {
        setReadOnly(true);
        setIsTyping(false);
        setCurrent(initialText);
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrent(e.target.value);

    const onSubmit = (data: CreateCommentFormData) => startTransition(async (): Promise<void> => {
        try {
            if (token) {
                await editComment(token.access_token, comment.id, data);
                setInitialText(data.text);
                setCurrent(data.text);
                setReadOnly(true);
                setIsTyping(false);
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

    const { User, Username, Time, Fieldset, Text, Label, Error, Button } = Element;

    return (
        <FormProvider {...createCommentForm}>
            <form
                {...rest}
                onSubmit={handleSubmit(onSubmit)}
                className="relative py-4"
            >
                {comment.user.username === user?.username && readOnly &&
                    <MenuButton
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
                                onClick={handleDeleteComment}
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
                    <div className="w-full">
                        <div className="flex items-baseline gap-1">
                            <Username comment={comment} />
                            <Time time={comment.created_at} />
                        </div>
                        <Fieldset readOnly={readOnly}>
                            <Text
                                readOnly={readOnly}
                                ref={textareaRef}
                                name="text"
                                value={current}
                                onChange={handleChange}
                            />
                            <Label>Adicione um comentário</Label>
                        </Fieldset>
                    </div>
                </header>
                {isTyping &&
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
                }
            </form>
        </FormProvider>
    )

}