export const Overlay = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className="pointer-events-none absolute inset-0 dark:bg-[rgba(0,0,0,.6)] bg-[rgba(255,255,255,.6)]"
        {...props}
    />
)