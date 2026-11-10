import { clsx } from 'clsx';

export const Submit = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        type="submit"
        className={clsx(
            'disabled:cursor-wait',
            'whitespace-nowrap',
            'w-fit h-fit p-2 rounded self-center',
            'text-sm text-white',
            'bg-primary',
            'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
            'hover:bg-secondary',
            'focus:bg-secondary',
            'transition-all',
        )}
        {...props}
    />
)