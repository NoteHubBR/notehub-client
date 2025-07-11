export const Section = (props: React.HTMLAttributes<HTMLElement>) => (
    <section
        className="flex-none
        max-w-full w-screen min-h-screen inmd:min-h-[calc(100svh-45px)] insm:pt-[48px]
        grid grid-cols-2 insm:grid-cols-1
        dark:bg-darker bg-lighter
        sm:[&:nth-child(even)>*:first-child]:order-2"
        {...props}
    />
)