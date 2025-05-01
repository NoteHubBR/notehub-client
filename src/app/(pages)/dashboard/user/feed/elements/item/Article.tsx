export const Article = (props: React.HTMLAttributes<HTMLElement>) => (
    <article
        className="p-3 rounded
            flex flex-col gap-2
            dark:bg-dark bg-light
            dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md"
        {...props}
    />
)