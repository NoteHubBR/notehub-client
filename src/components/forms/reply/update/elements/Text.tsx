import { CreateCommentFormData, createCommentFormSchema, getSchemaStringConstraints } from "@/core";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface TextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: keyof CreateCommentFormData;
}

export const Text = forwardRef<HTMLTextAreaElement, TextProps>(({ name, ...rest }, ref) => {

    const { register } = useFormContext();
    const { ref: registerRef, ...registerRest } = register(name);
    const { max } = getSchemaStringConstraints(createCommentFormSchema, name);

    return (
        <textarea
            ref={(element) => {
                registerRef(element);
                if (typeof ref === "function") ref(element);
                else if (ref) ref.current = element;
            }}
            {...registerRest}
            required
            rows={1}
            maxLength={max}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const target = e.currentTarget;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
            }}
            className="peer outline-none resize-none z-10
            w-full py-2 align-middle
            text-sm
            bg-transparent
            overflow-hidden"
            {...rest}
        />
    )

})

Text.displayName = "Comment";