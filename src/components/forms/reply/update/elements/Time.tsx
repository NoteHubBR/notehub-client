import { Reply, toRelativeTime } from "@/core";

interface TimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
    reply: Reply;
    modified: boolean;
}

export const Time = ({ reply, modified, ...rest }: TimeProps) => (
    <time className="flex-none font-medium text-xs dark:text-lighter/50 text-darker/50" {...rest}>
        {modified
            ? <>{toRelativeTime(reply.created_at)} {"(editado)"}</>
            : toRelativeTime(reply.created_at)}
    </time>
)