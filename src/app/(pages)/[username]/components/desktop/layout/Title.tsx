export const Title = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1
            className="absolute bottom-2 left-36 inlg:left-32
            py-1 px-2 rounded-md
            font-semibold text-xl text-white
            bg-neutral-900/20
            backdrop-blur-sm"
            {...props}
        />
    )
}