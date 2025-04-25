import { clsx } from "clsx";

export const Section = ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <section
        className={clsx(
            'p-3',
            'flex items-start rounded-lg',
            'dark:bg-dark bg-light',
            'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
            className
        )}
        {...rest}
    />
)