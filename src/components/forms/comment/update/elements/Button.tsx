import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPending?: boolean;
}

export const Button = ({ isPending, className, ...rest }: ButtonProps) => (
    <button
        className={clsx(
            'p-2 insm:px-1 rounded-full',
            'text-sm',
            isPending && 'cursor-wait',
            className
        )}
        {...rest}
    />
)