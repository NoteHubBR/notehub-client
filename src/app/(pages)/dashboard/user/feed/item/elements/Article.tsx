export const Article = (props: React.HTMLAttributes<HTMLElement>) => (
    <article
        className="p-3 rounded
            flex flex-col gap-2
            border dark:border-light/5 border-dark/5
            dark:bg-dark bg-light"
        {...props}
    />
)