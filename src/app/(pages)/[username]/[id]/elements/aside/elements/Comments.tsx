import { IconMessageCircle } from "@tabler/icons-react";
import { Note } from "@/core";
import Link, { LinkProps } from "next/link";

interface CommentsProps extends Omit<LinkProps, "href"> {
    note: Note;
}

export const Comments = ({ note, ...rest }: CommentsProps) => (
    <span className="flex items-center gap-2">
        <Link
            href="#comment"
            className="w-fit p-1 rounded-full
            text-white
            dark:bg-lighter/25 bg-darker/25
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
            dark:hover:bg-primary hover:bg-primary
            active:scale-110
            transition-all"
            {...rest}
        >
            <IconMessageCircle size={20} />
        </Link>
        {note.comments_count}
    </span>
)