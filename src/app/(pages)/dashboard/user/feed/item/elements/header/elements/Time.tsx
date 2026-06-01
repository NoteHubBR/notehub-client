import { toRelativeTime } from "@/core";

interface TimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
    time: string;
}

export const Time = ({ time, ...rest }: TimeProps) => (
    <time className="text-xs dark:text-lighter/50 text-darker/50" {...rest}>
        {toRelativeTime(time)}
    </time>
)