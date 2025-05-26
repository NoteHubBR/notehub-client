import { clsx } from "clsx";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    tip?: string
    icon?: React.ElementType;
    size?: number;
}

export const Label = ({ icon: Icon, size = 24, tip, className, children, ...rest }: LabelProps) => (
    <label
        className={clsx(
            'align-middle',
            'pl-1 text-sm',
            className
        )}
        {...rest}
    >
        {Icon && <Icon size={size} className="mr-1 inline-block dark:text-midlight text-middark" />}
        {children}
        {tip && <span className="ml-1 font-medium text-xs dark:text-midlight/65 text-middark/65">{tip}</span>}
    </label>
)