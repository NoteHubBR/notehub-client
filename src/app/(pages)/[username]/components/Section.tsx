import { clsx } from "clsx";

export const Section = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            className={clsx(
                'max-w-[999px] w-full m-auto rounded-[5px]',
                'dark:border dark:border-neutral-700/50',
                'inmd:dark:border-none',
                'dark:bg-neutral-950 bg-neutral-50',
                'drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]',
                'inmd:drop-shadow-[none]',
                className
            )}
            {...rest}
        />
    )
}