import { clsx } from "clsx";

export const Section = ({ className, children, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <section
        className={clsx(
            'py-4',
            'flex flex-col',
            'border-b dark:border-middark border-midlight last:border-none',
            'last:pb-0 last:flex-row last:justify-between',
            className
        )}
        {...rest}
    >
        {children}
    </section>
)