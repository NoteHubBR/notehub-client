import { clsx } from 'clsx';

export const Field = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={clsx(
            "relative px-2 py-3 flex items-center",
            className
        )}
        {...rest}
    />
)