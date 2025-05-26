import { clsx } from "clsx";

interface LegendProps extends React.HTMLAttributes<HTMLLegendElement> {
    tip?: string;
}

export const Legend = ({ tip, className, children, ...rest }: LegendProps) => (
    <legend
        className={clsx(
            'align-middle px-2',
            'text-sm',
            'dark:bg-darker bg-lighter',
            className
        )}
        {...rest}
    >
        {children}
        {tip && <span className="ml-1 font-medium text-xs dark:text-midlight/65 text-middark/65">{tip}</span>}
    </legend>
)