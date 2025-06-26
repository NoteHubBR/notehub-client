import { CreateCommentFormData, createCommentFormSchema, getSchemaStringConstraints } from "@/core";
import { forwardRef, useLayoutEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface TextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: keyof CreateCommentFormData;
}

export const Text = forwardRef<HTMLTextAreaElement, TextProps>(({ name, ...rest }, ref) => {

    const { register } = useFormContext();
    const { ref: registerRef, ...registerRest } = register(name);
    const { max } = getSchemaStringConstraints(createCommentFormSchema, name);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const refs = (element: HTMLTextAreaElement) => {
        registerRef(element);
        textareaRef.current = element;
        if (typeof ref === "function") ref(element);
        else if (ref) ref.current = element;
    }

    useLayoutEffect(() => {
        const txtRef = textareaRef.current;
        if (txtRef) {
            txtRef.style.height = 'auto';
            txtRef.style.height = `${txtRef.scrollHeight}px`;
        }
    }, [rest.value, rest.readOnly])

    return (
        <textarea
            ref={refs}
            {...registerRest}
            required
            rows={1}
            maxLength={max}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="peer outline-none resize-none z-10
            w-full py-2 align-middle
            text-sm
            bg-transparent
            overflow-hidden"
            {...rest}
        />
    )

})

Text.displayName = "Reply";