interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
    current: number;
    max: number;
}

export const Counter = ({ current, max, ...rest }: CounterProps) => {
    return (
        <span
            className="absolute top-[6px] right-6
            text-xs dark:text-neutral-400 text-neutral-600 font-bold
            opacity-0 peer-focus:opacity-100
            transition-opacity"
            {...rest}
        >
            {`${current}/${max}`}
        </span>
    )
}