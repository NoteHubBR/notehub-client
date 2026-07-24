import { clsx } from "clsx";

export const Section = ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <section
        className={clsx(
            'p-3',
            'border dark:border-light/10 border-dark/10',
            'flex items-start rounded-lg',
            'dark:bg-dark bg-light',
            className
        )}
        {...rest}
    />
)