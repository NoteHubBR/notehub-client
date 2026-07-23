import { clsx } from "clsx";

export const Section = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            className={clsx(
                'max-w-[999px] w-full min-h-full m-auto rounded-[5px]',
                'border inmd:border-none dark:border-light/10 border-dark/10',
                'dark:bg-darker bg-lighter',
                'inmd:drop-shadow-[none]',
                className
            )}
            {...rest}
        />
    )
}