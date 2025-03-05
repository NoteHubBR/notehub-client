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
                'dark:bg-neutral-900 bg-neutral-100 drop-shadow-[0_0_1px_rgba(0,0,0,.33)]',
                className
            )}
            {...rest}
        />
    )
}