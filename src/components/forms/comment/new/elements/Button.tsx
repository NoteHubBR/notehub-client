import { clsx } from "clsx";

export const Button = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={clsx(
            'p-2 rounded-full',
            'text-sm',
            className
        )}
        {...rest}
    />
)