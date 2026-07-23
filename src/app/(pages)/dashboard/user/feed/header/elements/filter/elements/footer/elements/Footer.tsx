import { clsx } from 'clsx';

export const Footer = (props: React.HTMLAttributes<HTMLElement>) => (
    <footer
        className={clsx(
            'px-4 py-2',
            'border-t dark:border-light/10 border-dark/10',
            'flex items-center justify-end gap-3',
        )}
        {...props}
    />
)