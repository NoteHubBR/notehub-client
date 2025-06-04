import { Note } from "@/core";
import Link from "next/link";

interface TagsProps extends React.HTMLAttributes<HTMLUListElement> {
    note: Note;
}

export const Tags = ({ note, ...rest }: TagsProps) => (
    <ul className="flex items-center gap-3 flex-wrap" {...rest}>
        {note.tags.map((tag, key) => (
            <li key={key}>
                <Link
                    href={`/search?type=tags&q=${tag}`}
                    className="w-fit px-2 py-1 rounded-full
                    border dark:border-secondary/25 border-primary
                    font-semibold text-xs dark:text-secondary text-primary
                    dark:bg-secondary/25 bg-primary/10
                    hover:!text-white dark:hover:bg-secondary hover:bg-primary"
                >
                    {tag}
                </Link>
            </li>
        ))}
    </ul>
)