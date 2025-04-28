export const Overlay = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,.6)]"
        {...props}
    />
)