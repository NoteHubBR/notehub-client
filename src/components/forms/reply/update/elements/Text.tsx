import { CreateCommentFormData, createCommentFormSchema, getSchemaStringConstraints } from "@/core";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: keyof CreateCommentFormData;
    isExpanded: boolean;
    toggleIsExpanded: () => void;
}

export const Text = forwardRef<HTMLTextAreaElement, TextProps>(({ name, isExpanded, toggleIsExpanded, readOnly, ...rest }, ref) => {

    const { register } = useFormContext();
    const { ref: registerRef, ...registerRest } = register(name);
    const { max } = getSchemaStringConstraints(createCommentFormSchema, name);

    const [isOverflow, setIsOverflow] = useState<boolean>(false);
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
            const totalHeight = txtRef.scrollHeight;
            const style = window.getComputedStyle(txtRef);
            const paddingTop = parseFloat(style.paddingTop);
            const paddingBottom = parseFloat(style.paddingBottom);

            let lineHeightValue: number;
            if (style.lineHeight === 'normal') lineHeightValue = parseFloat(style.fontSize) * 1.2;
            else lineHeightValue = parseFloat(style.lineHeight);

            const maxHeight = (lineHeightValue * 3) + paddingTop + paddingBottom;
            const hasOverflow = totalHeight > maxHeight;
            setIsOverflow(hasOverflow);

            if (readOnly && hasOverflow && !isExpanded) {
                txtRef.style.height = `${maxHeight}px`;
                txtRef.style.overflow = 'hidden';
            } else {
                txtRef.style.height = `${totalHeight}px`;
                txtRef.style.overflow = 'hidden';
            }
        }

    }, [rest.value, readOnly, isExpanded])

    return (
        <>
            <textarea
                ref={refs}
                {...registerRest}
                required
                readOnly={readOnly}
                rows={1}
                maxLength={max}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="peer outline-none resize-none z-10
                w-full py-1
                align-middle text-sm
                bg-transparent"
                {...rest}
            />
            {readOnly && isOverflow && (
                <button
                    type="button"
                    onClick={toggleIsExpanded}
                    className="font-medium text-sm dark:text-lighter/60 text-darker/60 hover:underline"
                >
                    {isExpanded ? "Mostrar menos" : "Ler mais"}
                </button>
            )}
        </>
    )

})

Text.displayName = "Reply";