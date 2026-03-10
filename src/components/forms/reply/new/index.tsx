import { clsx } from "clsx";
import { Comment, createCommentFormSchema, CreateReplyFormData, handleFieldErrors, Page, Reply, Token, User } from "@/core";
import { Component } from "@/components";
import { Element } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useRef, useState, useTransition } from "react";
import { useServices } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    token: Token;
    user: User;
    comment: Comment;
    useSelfReference?: boolean;
    selfReferenceReply?: Reply;
    isReplying: boolean;
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
    setRepliesCount: React.Dispatch<React.SetStateAction<number>>;
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

type RepliesCache = InfiniteData<Page<Reply>>;

export const Form = ({ useSelfReference, token, user, comment, isReplying, selfReferenceReply, setReplies, setRepliesCount, setIsReplying, ...rest }: FormProps) => {

    const { replyService: { createReply, createSelfReferenceReply } } = useServices();
    const qc = useQueryClient();

    const createReplyForm = useForm<CreateReplyFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    const { handleSubmit, setError } = createReplyForm;

    const [isPending, startTransition] = useTransition();
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [reply, setReply] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReply(e.target.value);
    const handleFocus = () => setIsTyping(true);

    const cancel = () => {
        setIsTyping(false);
        setReply("");
        setIsReplying(false);
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    }

    const onSubmit = (data: CreateReplyFormData) => startTransition(async (): Promise<void> => {
        try {
            const reply = useSelfReference && selfReferenceReply
                ? await createSelfReferenceReply(token.access_token, selfReferenceReply.id, data)
                : await createReply(token.access_token, comment.id, data);
            if (textareaRef.current) textareaRef.current.style.height = "auto";
            setIsTyping(false);
            setReply("");
            setReplies(prev => [...prev, reply]);
            setRepliesCount(prev => prev + 1);
            setIsReplying(false);
            qc.setQueryData<RepliesCache>(
                ['replies', token.access_token, comment.id],
                (oldData) => {
                    if (oldData) return {
                        ...oldData,
                        pages: oldData.pages.map((page, index: number) => {
                            if (index === 0) return { ...page, content: [...page.content, reply] };
                            return page;
                        })
                    }
                    return oldData;
                }
            )
        } catch (errors) {
            if (Array.isArray(errors)) return handleFieldErrors(errors, setError);
        }
    })

    const { Fieldset, Text, Label, Error, Button } = Element;

    if (isReplying) return (
        <FormProvider {...createReplyForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                {...rest}
                className="pl-10 pb-4"
            >
                <header className="flex gap-3">
                    <Component.Photo user={user} size={40} />
                    <Fieldset>
                        <Text
                            ref={textareaRef}
                            name="text"
                            value={reply}
                            autoFocus
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
                                disabled={isPending || reply.length < 1}
                                isPending={isPending}
                                type="submit"
                                className={clsx(
                                    reply.length > 0
                                        ? 'text-white dark:bg-secondary bg-primary hover:dark:bg-primary hover:bg-secondary'
                                        : 'dark:text-midlight text-middark dark:bg-lighter/25 bg-darker/25',
                                )}
                            >
                                Responder
                            </Button>
                        </div>
                    </footer>
                }
            </form>
        </FormProvider>
    )

}