import { clsx } from "clsx";

export const Section = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section
            style={{ filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, .33))' }}
            className={clsx(
                'max-w-[999px] w-full m-auto rounded-[5px]',
                'dark:border dark:border-neutral-700/50',
                'dark:bg-neutral-950 bg-neutral-50',
                className
            )}
            {...rest}
        />
    )
}