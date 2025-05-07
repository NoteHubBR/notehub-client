export const Desc = ({ className, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`${className}`} {...rest} />
)