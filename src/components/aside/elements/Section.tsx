export const Section = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            className="
                pt-3
                flex flex-col gap-1   
                border-t border-t-neutral-50/50 
                first:pt-0 first:border-t-transparent
            "
            {...props}
        />
    )
}