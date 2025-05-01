export const Li = (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
        className="relative
        px-3 pb-5 flex flex-col
        border-l dark:border-neutral-700 border-neutral-400
        after:absolute after:top-0 after:-left-1 after:w-2 after:h-2 after:rounded-full after:dark:bg-neutral-700 after:bg-neutral-400
        last:pb-0 last:after:hidden"
        {...props}
    />
)