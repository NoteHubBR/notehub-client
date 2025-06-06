import { Note, toRelativeTime } from "@/core";

interface TimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
    note: Note;
}

export const Time = ({ note, ...rest }: TimeProps) => (
    <time className="font-medium text-xs dark:text-lighter/50 text-darker/50" {...rest}>
        {note.modified
            ? note.modified_at === "now" ? "Atualizada agora" : `Atualizada ${toRelativeTime(note.modified_at)}`
            : `Criada ${toRelativeTime(note.modified_at)}`
        }
    </time>
)