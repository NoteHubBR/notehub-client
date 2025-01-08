interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Container = ({ className, ...rest }: ContainerProps) => {
    return (
        <section
            className={`w-screen max-w-full h-screen max-h-full inmd:h-svh ${className}`}
            {...rest}
        />
    )
}