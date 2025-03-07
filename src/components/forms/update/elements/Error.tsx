export const Error = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={`absolute top-[105%] left-6 font-medium text-sm text-red-500 ${className}`}
            {...rest}
        />
    )
}