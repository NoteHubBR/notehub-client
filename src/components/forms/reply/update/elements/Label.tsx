export const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label
        htmlFor="comment"
        className="pointer-events-none
        absolute inset-0 top-1/2 -translate-y-1/2 left-0
        text-sm dark:text-midlight/50 text-middark/50
        peer-focus:opacity-0 peer-valid:opacity-0 peer-[.has-text]:opacity-0
        peer-read-only:opacity-0
        transition-opacity duration-300"
        {...props}
    />
)