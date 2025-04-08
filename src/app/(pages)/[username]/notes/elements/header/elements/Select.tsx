import { forwardRef } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface SelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(({ text, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            aria-label="Abrir menu"
            aria-haspopup="true"
            // aria-expanded={isOpen}
            className="select-none relative insm:static
            px-2 py-1 rounded-xl flex items-center gap-1
            border dark:border-neutral-700/50 border-dark/25
            dark:bg-dark bg-light
            hover:dark:bg-semidark hover:bg-semilight
            transition-colors"
            {...rest}
        >
            <span>{text}</span>
            <span><IconChevronDown size={18} /></span>
            {rest.children}
        </button>
    )
})

Select.displayName = 'Select';