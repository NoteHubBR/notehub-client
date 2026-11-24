import { clsx } from 'clsx';
import { LowDetailNote } from '@/core';

interface Props extends React.HTMLAttributes<HTMLElement> {
    note: LowDetailNote
}

export const Section = ({ note, className, ...rest }: Props) => (
    <section
        className={clsx(
            'p-3',
            'border dark:border-light/10 border-dark/10',
            'flex items-start rounded-lg',
            note.encrypted || note.hidden
                ? note.encrypted && note.hidden
                    ? 'dark:bg-darker bg-lighter'
                    : note.encrypted
                        ? 'dark:bg-encrypted-dark bg-encrypted'
                        : 'dark:bg-hidden-dark bg-hidden'
                : 'dark:bg-dark bg-light',
            className
        )}
        {...rest}
    />
)