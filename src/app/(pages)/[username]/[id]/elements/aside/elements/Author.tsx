import { Note } from "@/core";

interface AuthorProps extends React.HTMLAttributes<HTMLHeadingElement> {
    note: Note;
}

export const Author = ({ note, ...rest }: AuthorProps) => (
    <h4
        className="-mt-4 font-medium text-sm"
        {...rest}
    >
        por <span className="dark:text-secondary text-primary">{note.user.username}</span>
    </h4>
)