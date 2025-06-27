import { clsx } from "clsx";
import { Comment, CreateCommentFormData, createCommentFormSchema, handleFieldErrors, Note, Token, User } from "@/core";
import { Component } from "@/components";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { useRef, useState, useTransition } from "react";
import { useServices } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    token: Token;
    user: User;
    note: Note;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const Form = ({ token, user, note, setComments, setNote, ...rest }: FormProps) => {

    const { commentService: { createComment } } = useServices();

    const createCommentForm = useForm<CreateCommentFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    const { handleSubmit, setError } = createCommentForm;

    const [isPending, startTransition] = useTransition();
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);
    const handleFocus = () => setIsTyping(true);

    const cancel = () => {
        setIsTyping(false);
        setComment("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    }

    const onSubmit = (data: CreateCommentFormData) => startTransition(async (): Promise<void> => {
        try {
            const comment = await createComment(token.access_token, note.id, data);
            if (textareaRef.current) textareaRef.current.style.height = "auto";
            setIsTyping(false);
            setComment("");
            setComments(prev => [comment, ...prev]);
            return setNote((prev) => {
                if (prev) return { ...prev, comments_count: prev.comments_count + 1 };
                else return null;
            })
        } catch (errors) {
            if (Array.isArray(errors)) return handleFieldErrors(errors, setError);
        }
    })

    const { Fieldset, Text, Label, Error, Button } = Element;

    return (
        <FormProvider {...createCommentForm}>
            <form
                id="comment-wrapper"
                onSubmit={handleSubmit(onSubmit)}
                {...rest}
                className="scroll-mt-[8vh] inmd:scroll-mt-0 py-4"
            >
                <header className="flex gap-3">
                    <Component.Photo user={user} size={40} />
                    <Fieldset>
                        <Text
                            ref={textareaRef}
                            name="text"
                            value={comment}
                            onFocus={handleFocus}
                            onChange={handleChange}
                        />
                        <Label>Adicione um comentário</Label>
                    </Fieldset>
                </header>
                {isTyping &&
                    <footer className="pl-12 insm:pl-0 pt-2 flex items-center justify-between">
                        <Error field="text" />
                        <div className="w-full flex items-center gap-1 justify-end">
                            <Button
                                disabled={isPending}
                                type="button"
                                onClick={cancel}
                                className="dark:hover:bg-lighter/10 hover:bg-darker/10"
                            >
                                Cancelar
                            </Button>
                            <Button
                                disabled={isPending || comment.length < 1}
                                isPending={isPending}
                                type="submit"
                                className={clsx(
                                    comment.length > 0
                                        ? 'text-white dark:bg-secondary bg-primary hover:dark:bg-primary hover:bg-secondary'
                                        : 'dark:text-midlight text-middark dark:bg-lighter/25 bg-darker/25',
                                )}
                            >
                                Comentar
                            </Button>
                        </div>
                    </footer>
                }
            </form>
        </FormProvider>
    )

}