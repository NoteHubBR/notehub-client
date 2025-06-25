import { Note } from "@/core";
import Link from "next/link";

interface AuthorProps extends React.HTMLAttributes<HTMLHeadingElement> {
    note: Note;
}

export const Author = ({ note, ...rest }: AuthorProps) => {
    if (note.user) return (
        <h4
            className="-mt-4 font-medium text-sm"
            {...rest}
        >
            por
            <Link
                href={`/${note.user.username}`}
                className="underline ml-1 dark:text-secondary text-primary">
                {note.user.username}
            </Link>
        </h4>
    )
}