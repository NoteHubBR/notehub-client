import { clsx } from 'clsx';
import { NoteTextUpdateFormData, renderMarkdown } from "@/core";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface TextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    setText: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

export const Text = ({ setText, value, ...rest }: TextProps) => {

    const { setValue } = useFormContext<NoteTextUpdateFormData>();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue("markdown", newValue);
        setText(newValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            if (textareaRef.current) {
                const { selectionStart, selectionEnd } = textareaRef.current;
                const newValue = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;
                setValue("markdown", newValue);
                setText(newValue);
                setTimeout(() => {
                    if (textareaRef.current) {
                        const newPos = selectionStart + 1;
                        textareaRef.current.selectionStart = newPos;
                        textareaRef.current.selectionEnd = newPos;
                    }
                }, 0)
            }
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            const len = textareaRef.current.value.length;
            textareaRef.current.selectionStart = len;
            textareaRef.current.selectionEnd = len;
        }
    }, [])

    return (
        <textarea
            ref={textareaRef}
            id="markdown"
            name="markdown"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoFocus
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={clsx(
                'resize-none outline-none',
                'overscroll-contain inmd:overscroll-auto',
                'p-4 flex-1',
                'scrollbar-desktop inmd:scrollbar-mobile',
                'bg-transparent'
            )}
            {...rest}
        />
    )

}