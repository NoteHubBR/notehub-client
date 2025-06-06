import { clsx } from "clsx";

interface CountProps extends React.HTMLAttributes<HTMLSpanElement> {
    current: number;
    max: number | undefined;
}

export const Count = ({ current, max, className, ...rest }: CountProps) => (
    <span
        className={clsx(
            'pointer-events-none select-none whitespace-nowrap',
            'absolute top-2 right-0 px-1',
            'font-medium text-xs dark:text-midlight/50 text-middark/50',
            'opacity-0 peer-focus:opacity-100 peer-focus-within:opacity-100',
            'transition-opacity',
            className
        )}
        {...rest}
    >
        {`${current}/${max}`}
    </span>
)