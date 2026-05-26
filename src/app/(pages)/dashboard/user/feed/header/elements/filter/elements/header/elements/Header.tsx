import { clsx } from 'clsx';

export const Header = (props: React.HTMLAttributes<HTMLElement>) => (
    <header
        className={clsx(
            'px-4 py-2',
            'border-b dark:border-midlight/15 border-middark/15',
            'flex items-center justify-between',
        )}
        {...props}
    />
)