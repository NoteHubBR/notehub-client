export const Section = (props: React.HTMLAttributes<HTMLElement>) => (
    <section
        className="max-w-full w-screen min-h-[calc(100vh-8vh)]
        inmd:first:min-h-[calc(100svh-93px)] inmd:min-h-[calc(100svh-45px)]
        grid grid-cols-2 insm:grid-cols-1
        dark:bg-darker bg-lighter"
        {...props}
    />
)