export const Fieldset = ({ className, ...rest }: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => (
    <fieldset className={className} {...rest} />
)