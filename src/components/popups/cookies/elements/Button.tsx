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
            'hover:saturate-150 focus:saturate-150 focus-visible:saturate-150 active:saturate-150',
        )}
    />
)