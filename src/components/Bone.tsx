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
                'dark:bg-dark bg-light dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                className
            )}
            {...rest}
        />
    )
}