import { LowDetailNote, toRelativeTime } from "@/core";

interface TimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
    note: LowDetailNote;
}

export const Time = ({ note, className, ...rest }: TimeProps) => (
    <time className={`text-xs dark:text-lighter/50 text-darker/50 ${className}`} {...rest}>
        {note.modified
            ? `Atualizada ${toRelativeTime(note.modified_at)}`
            : `Criada ${toRelativeTime(note.created_at)}`
        }
    </time>
)