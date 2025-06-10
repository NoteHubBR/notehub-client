export const Error = (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <p
        className="pl-1 text-sm font-medium dark:text-red-500 text-red-600"
        {...props}
    >
        Error
    </p>
)