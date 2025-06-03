import { NoteTextUpdateFormData } from "@/core";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

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

    return (
        <textarea
            ref={textareaRef}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="resize-none outline-none flex-1
            p-4
            scrollbar-desktop inmd:scrollbar-mobile overscroll-contain
            bg-transparent"
            {...rest}
        />
    )

}