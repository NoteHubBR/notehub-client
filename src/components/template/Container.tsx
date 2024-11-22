interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Container = ({ className, ...rest }: ContainerProps) => {
    return (
        <div
            className={`w-screen max-w-full min-h-screen inmd:min-h-svh ${className}`}
            {...rest} />
    )
}