export const Title = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1
            className="w-fit text-center
            py-2 px-3 rounded-tr-3xl rounded-bl-3xl
            truncate font-semibold text-xl text-white
            backdrop-blur-sm bg-black/10
            drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]"
            {...props}
        />
    )
}