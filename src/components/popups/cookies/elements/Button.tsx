import { clsx } from 'clsx';

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        {...props}
        autoFocus
        className={clsx(
            'px-2 py-1.5 rounded-md',
            'text-nowrap text-center text-sm insm:text-xs',
            'text-lighter',
            'bg-primary',
            'hover:opacity-90 focus:opacity-90 focus-visible:opacity-90 active:opacity-90',
        )}
    />
)