export const PlainText = ({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={`${className}`} {...rest} />
)