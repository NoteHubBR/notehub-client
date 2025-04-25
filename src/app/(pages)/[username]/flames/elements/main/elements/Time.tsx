import { Flame, toRelativeTime } from "@/core";

interface TimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
    flame: Flame;
}

export const Time = ({ flame, className, ...rest }: TimeProps) => (
    <time className={`text-xs dark:text-lighter/50 text-darker/50 ${className}`} {...rest}>
        Inflamada {toRelativeTime(flame.created_at)}
    </time>
)