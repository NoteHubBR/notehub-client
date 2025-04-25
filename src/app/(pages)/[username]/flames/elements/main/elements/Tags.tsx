import { clsx } from "clsx";

export const Tags = ({ className, children, ...rest }: React.HTMLAttributes<HTMLUListElement>) => (
    <nav>
        <ul
            className={clsx('mt-1 flex items-center gap-1 flex-wrap', className)}
            {...rest}
        >
            {children}
        </ul>
    </nav>
)