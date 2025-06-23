import { clsx } from "clsx";
import { CreateReplyFormData, createReplyFormSchema, handleFieldErrors, Note, Reply, Token, User } from "@/core";
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
    reply: Reply;
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
    setRepliesCount: React.Dispatch<React.SetStateAction<number>>;
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Form = ({ token, user, note, reply, setReplies, setRepliesCount, setIsReplying, ...rest }: FormProps) => {

    const { replyService: { editReply, deleteReply } } = useServices();

    const editReplyForm = useForm<CreateReplyFormData>({
        resolver: zodResolver(createReplyFormSchema)
    })

    const { handleSubmit, setError } = editReplyForm;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [initialText, setInitialText] = useState<string>(reply.text);
    const [current, setCurrent] = useState<string>(initialText);
    const [modified, setModified] = useState<boolean>(reply.modified);
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

    const startDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleMenu();
        setIsDeleting(true);
        return;
    }

    const openReplyBox = () => setIsReplying(true);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrent(e.target.value);

    const onSubmit = (data: CreateReplyFormData) => startTransition(async (): Promise<void> => {
        try {
            if (token) {
                await editReply(token.access_token, reply.id, data);
                setInitialText(data.text);
                setCurrent(data.text);
                setReadOnly(true);
                setIsTyping(false);
                setModified(true);
            }
        } catch (errors) {
            if (Array.isArray(errors)) return handleFieldErrors(errors, setError);
        }
    })

    const handleDeleteReply = () => startTransition(async () => {
        if (token) {
            await deleteReply(token.access_token, reply.id);
            setReplies(prev => prev.filter((r) => r.id != reply.id));
            setRepliesCount(prev => prev - 1);
        }
    })

    const { User, Username, Reference, Time, Fieldset, Text, Label, Error, Button, Dialog } = Element;

    return (
        <FormProvider {...editReplyForm}>
            <form
                {...rest}
                onSubmit={handleSubmit(onSubmit)}
                className="relative pl-10 py-2"
            >
                {reply.user.username === user?.username && readOnly &&
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
                    <User reply={reply} />
                    <div className="overflow-hidden w-full">
                        <div className="insm:max-w-[85%] flex items-baseline gap-1">
                            <Username reply={reply} />
                            <Reference reply={reply} />
                            <Time reply={reply} modified={modified} />
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
                    user && !note.closed
                        ?
                        <footer className="pl-10 flex items-center">
                            <Button
                                type="button"
                                onClick={openReplyBox}
                                className="font-medium dark:text-neutral-400 text-neutral-600 dark:hover:bg-lighter/10 hover:bg-darker/10"
                            >
                                Responder
                            </Button>
                        </footer>
                        :
                        <></>
                }
                <Dialog
                    disabled={isPending}
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                    onClick={handleDeleteReply}
                />
            </form>
        </FormProvider>
    )

}