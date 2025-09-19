interface oAuthErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    error: string | undefined;
}

const OAuthError = ({ error, ...rest }: oAuthErrorProps) => {
    if (error) return (
        <p
            className="px-1 font-bold text-center text-sm dark:text-red-500 text-rose-500"
            {...rest}
        >
            {error}
        </p>
    )
    return null;
}

export default OAuthError;