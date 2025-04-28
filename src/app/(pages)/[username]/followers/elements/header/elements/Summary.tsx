import { forwardRef } from "react";
import { IconX } from "@tabler/icons-react";

interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    summary: string;
}

export const Summary = forwardRef<HTMLSpanElement, SummaryProps>(({ summary, ...rest }, ref) => {
    return (
        <div
            className="p-2
            flex items-center justify-between gap-3
            border-b dark:border-neutral-700/50 border-dark/25
            dark:bg-semidark bg-semilight"
            {...rest}
        >
            <span className="text-xs">{summary}</span>
            <span
                ref={ref}
                role="button"
                aria-label="Fechar menu"
                className="hover:opacity-50 transition-opacity"
            >
                <IconX size={15} />
            </span>
        </div>
    )
})

Summary.displayName = 'Summary';