export const Section = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            className="pt-3
                flex flex-col gap-2
                border-t dark:border-t-semilight/15 border-t-semidark/15
                first:pt-0 first:dark:border-t-transparent first:border-t-transparent"
            {...props}
        />
    )
}