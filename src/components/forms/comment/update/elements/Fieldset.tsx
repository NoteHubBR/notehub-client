import { clsx } from "clsx";

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    readOnly: boolean;
}

export const Fieldset = ({ readOnly, ...rest }: FieldsetProps) => (
    <fieldset
        className={clsx(
            'relative',
            'w-full',
            readOnly
                ? 'border-none'
                : 'border-b dark:border-middark border-midlight',
            'after:pointer-events-none',
            'after:absolute after:inset-0 after:w-0 after:left-1/2',
            'after:border-b after:dark:border-transparent after:border-transparent',
            'focus-within:after:w-full focus-within:after:left-0',
            readOnly
                ? 'focus-within:after:dark:border-transparent focus-within:after:border-transparent'
                : 'focus-within:after:dark:border-light focus-within:after:border-dark',
            'after:transition-all after:duration-300',
        )}
        {...rest}
    />
)