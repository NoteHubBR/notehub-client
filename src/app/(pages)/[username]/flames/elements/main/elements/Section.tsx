import { clsx } from 'clsx';
import { LowDetailNote } from '@/core';

interface Props extends React.HTMLAttributes<HTMLElement> {
    note: LowDetailNote
}

export const Section = ({ note, className, ...rest }: Props) => (
    <section
        className={clsx(
            'group',
            'border dark:border-light/10 border-dark/10',
            'flex items-start rounded-lg',
            note.encrypted || note.hidden
                ? note.encrypted && note.hidden
                    ? 'dark:bg-darker bg-lighter'
                    : note.encrypted
                        ? 'dark:bg-encrypted-dark bg-encrypted'
                        : 'dark:bg-hidden-dark bg-hidden'
                : 'dark:bg-dark bg-light',
            'transition-colors duration-[333ms]',
            'hover:dark:border-light/15 hover:border-dark/15',
            'focus-within:dark:border-light/15 focus-within:border-dark/15',
            className
        )}
        {...rest}
    />
)