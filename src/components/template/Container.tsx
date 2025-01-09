interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Container = ({ className, ...rest }: ContainerProps) => {
    return (
        <section
            className={`w-screen max-w-full min-h-screen inmd:h-svh ${className}`}
            {...rest}
        />
    )
}