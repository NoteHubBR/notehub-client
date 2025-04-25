export const Pagination = ({ className, children, ...rest }: React.HTMLAttributes<HTMLUListElement>) => (
    <nav>
        <ul className={`flex items-center justify-center gap-3 ${className}`} {...rest}>
            {children}
        </ul>
    </nav>
)