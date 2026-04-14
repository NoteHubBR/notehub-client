import { clsx } from 'clsx';

export const Field = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={clsx(
            'relative p-2',
            className
        )}
        {...rest}
    />
)