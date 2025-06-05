export const Fieldset = ({ className, ...rest }: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => (
    <fieldset className={`py-1 ${className}`} {...rest} />
)