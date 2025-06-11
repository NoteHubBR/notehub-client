import { clsx } from "clsx";

export const Button = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={clsx(
            'disabled:cursor-wait',
            'p-2 insm:px-1 rounded-full',
            'text-sm',
            className
        )}
        {...rest}
    />
)