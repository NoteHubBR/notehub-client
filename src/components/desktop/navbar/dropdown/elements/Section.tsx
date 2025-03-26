export const Section = (props: React.HTMLAttributes<HTMLUListElement>) => {
    return (
        <section
            className="cursor-auto
                pt-2
                border-t dark:border-t-lighter/20 border-t-dark/20
                first:pt-0 pb-2 first:dark:border-t-transparent first:border-t-transparent"
        >
            <ul className="flex flex-col gap-2" {...props} />
        </section>
    )
}