export const Title = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1
            className="w-fit flex items-center justify-center gap-1
            py-2 px-3 rounded-tr-3xl rounded-bl-3xl
            truncate font-semibold text-xl text-white
            backdrop-blur-sm bg-black/10
            drop-shadow-alpha-d-sm"
            {...props}
        />
    )
}