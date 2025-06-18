interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
    current: number;
    max: number | undefined;
}

export const Counter = ({ current, max, ...rest }: CounterProps) => {
    return (
        <span
            className="pointer-events-none select-none
            absolute top-1 right-2
            text-xs dark:text-neutral-400 text-neutral-600 font-bold
            opacity-0 peer-focus:opacity-100
            transition-opacity"
            {...rest}
        >
            {`${current}/${max}`}
        </span>
    )
}