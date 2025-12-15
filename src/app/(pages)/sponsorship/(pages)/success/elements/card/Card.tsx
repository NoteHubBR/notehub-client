import { clsx } from "clsx";

export const Card = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={clsx(
            'z-10 center',
            'max-w-[468px] insm:max-w-[90%] w-full max-h-[468px] h-full p-4 rounded',
            'flex flex-col items-center justify-center gap-7',
            'dark:bg-darker bg-lighter',
            'dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md'
        )}
        {...props}
    />
)