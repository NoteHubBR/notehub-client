import { clsx } from "clsx";

interface Bone extends React.HTMLAttributes<HTMLDivElement> {
    width: number;
    height: number;
    rounded: string;
    className?: string
}

export const Bone = ({ width, height, rounded, className, ...rest }: Bone) => {
    return (
        <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={clsx(
                `rounded-${rounded}`,
                'relative overflow-hidden',
                'after:absolute after:inset-0',
                'after:-translate-x-full',
                'after:bg-gradient-to-r',
                'after:dark:from-transparent after:dark:via-light/15 after:dark:to-transparent',
                'after:from-transparent after:via-dark/15 after:to-transparent',
                'after:animate-shiny',
                'dark:bg-dark bg-light dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                className
            )}
            {...rest}
        />
    )
}