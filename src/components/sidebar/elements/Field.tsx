export const Field = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className="
                cursor-pointer
                py-1 px-2
                rounded-md
                hover:bg-neutral-50/15   
                transition-colors
            "
            {...props}
        />
    )
}