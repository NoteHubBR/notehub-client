import { forwardRef } from "react";

export const Text = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => (
    <textarea
        ref={ref}
        id="comment"
        required
        rows={1}
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
        {...props}
    />
))

Text.displayName = "Comment";