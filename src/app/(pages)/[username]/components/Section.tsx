export const Section = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,.25))' }}
            className="max-w-[999px] w-full m-auto rounded-md
            dark:border dark:border-neutral-700/50"
            {...props}
        />
    )
}