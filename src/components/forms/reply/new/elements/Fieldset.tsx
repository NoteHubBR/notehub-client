export const Fieldset = (props: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => (
    <fieldset
        className="relative
        w-full
        border-b dark:border-middark border-midlight
        after:pointer-events-none
        after:absolute after:inset-0 after:w-0 after:left-1/2
        after:border-b after:dark:border-transparent after:border-transparent
        focus-within:after:w-full focus-within:after:left-0
        focus-within:after:dark:border-light focus-within:after:border-dark
        after:transition-all after:duration-300"
        {...props}
    />
)