import { clsx } from 'clsx';

export const Header = (props: React.HTMLAttributes<HTMLElement>) => (
    <header
        className={clsx(
            'px-4 py-2',
            'border-b dark:border-light/10 border-dark/10',
            'flex items-center justify-between',
        )}
        {...props}
    />
)