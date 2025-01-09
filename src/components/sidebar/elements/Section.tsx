export const Section = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            className="
                pt-3
                flex flex-col gap-2
                border-t dark:border-t-neutral-50/20 border-t-neutral-900/20
                first:pt-0 first:dark:border-t-transparent first:border-t-transparent
            "
            {...props}
        />
    )
}