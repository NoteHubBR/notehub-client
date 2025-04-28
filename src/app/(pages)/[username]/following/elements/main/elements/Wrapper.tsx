export const Wrapper = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className="relative h-36 w-48 flex-none
        bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600
        dark:drop-shadow-alpha-l drop-shadow-alpha-d"
        {...props}
    />
)