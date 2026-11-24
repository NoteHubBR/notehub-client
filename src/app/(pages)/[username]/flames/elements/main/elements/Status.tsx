import { clsx } from 'clsx';
import { IconEyeDotted, IconEyeKey, IconEyeX } from '@tabler/icons-react';
import { LowDetailNote } from '@/core';

const Span = ({ children, className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        {...rest}
        className={clsx(
            'z-10 center',
            'inmd:left-auto inmd:-right-1 inmd:top-4',
            'dark:text-middark text-midlight',
            className
        )}
    >
        {children}
    </span>
)

export const Status = ({ note, className, ...rest }: { note: LowDetailNote; } & React.HTMLAttributes<HTMLSpanElement>) => {

    if (note.encrypted && note.hidden) return (
        <Span className={className} {...rest}>
            <IconEyeDotted size={36} data-testid='note-status-encrypted-and-hidden' />
        </Span>
    )

    if (note.encrypted) return (
        <Span className={className} {...rest}>
            <IconEyeKey size={36} data-testid='note-status-encrypted' />
        </Span>
    )

    if (note.hidden) return (
        <Span className={className} {...rest}>
            <IconEyeX size={36} data-testid='note-status-hidden' />
        </Span>
    )

    return null;

}