import { clsx } from "clsx";
import { IconEyeOff, IconKey } from "@tabler/icons-react";
import { LowDetailNote } from "@/core";

const Span = ({ children, className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        {...rest}
        className={clsx(
            'absolute top-0 right-0',
            'p-[2px] rounded-full',
            'border dark:border-light/25 border-dark/25',
            'dark:text-light/25 text-dark/25',
            'dark:bg-dark bg-light',
            className
        )}
    >
        {children}
    </span>
)

export const Status = ({ note, className, ...rest }: { note: LowDetailNote; } & React.HTMLAttributes<HTMLSpanElement>) => {

    if (note.encrypted && note.hidden) return (
        <>
            <Span className='right-8' {...rest}>
                <IconEyeOff size={20} data-testid="note-status-hidden" />
            </Span>
            <Span {...rest}>
                <IconKey size={20} data-testid="note-status-encrypted" />
            </Span>
        </>
    )

    if (note.encrypted) return (
        <Span {...rest}>
            <IconKey size={20} data-testid="note-status-encrypted" />
        </Span>
    )

    if (note.hidden) return (
        <Span {...rest}>
            <IconEyeOff size={20} data-testid="note-status-hidden" />
        </Span>
    )

    return null;

}