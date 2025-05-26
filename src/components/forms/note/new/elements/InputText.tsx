import { clsx } from "clsx";

export const InputText = ({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        type="text"
        className={clsx(
            'px-2 py-1 rounded-md',
            'border dark:border-middark border-midlight',
            'text-sm',
            'bg-transparent',
            'focus:!border-primary',
            'transition-colors',
            className
        )}
        {...rest}
    />
)