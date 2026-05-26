import { clsx } from 'clsx';

export const Footer = (props: React.HTMLAttributes<HTMLElement>) => (
    <footer
        className={clsx(
            'px-4 py-2',
            'border-t dark:border-midlight/15 border-middark/15',
            'flex items-center justify-end gap-3',
        )}
        {...props}
    />
)