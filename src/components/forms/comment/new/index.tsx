import { clsx } from "clsx";
import { Element } from "./elements";
import { useRef, useState } from "react";

export const Form = () => {

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

    const { Fieldset, Text, Label, Error, Button } = Element;

    return (
        <form className="flex-1">
            <Fieldset>
                <Text
                    ref={textareaRef}
                    value={comment}
                    onFocus={handleFocus}
                    onChange={handleChange}
                />
                <Label>Adicione um comentário</Label>
            </Fieldset>
            {isTyping &&
                <footer className="py-2 flex items-center justify-between">
                    <Error />
                    <div className="flex items-center gap-1 justify-end">
                        <Button
                            type="button"
                            onClick={cancel}
                            className="dark:hover:bg-lighter/10 hover:bg-darker/10"
                        >
                            Cancelar
                        </Button>
                        <Button
                            disabled={comment.length < 1}
                            type="button"
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
    )

}