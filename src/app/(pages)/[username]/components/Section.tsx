import { clsx } from "clsx";

export const Section = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            className={clsx(
                'max-w-[999px] w-full m-auto rounded-[5px]',
                'dark:border dark:border-neutral-700/50',
                'inmd:dark:border-none',
                'dark:bg-darker bg-lighter',
                'drop-shadow-alpha-d-sm',
                'inmd:drop-shadow-[none]',
                className
            )}
            {...rest}
        />
    )
}