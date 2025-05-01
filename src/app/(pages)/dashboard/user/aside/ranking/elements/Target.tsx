import { LowDetailNote } from "@/core";
import Link, { LinkProps } from "next/link";

interface TargetProps extends Omit<LinkProps, 'href'> {
    note: LowDetailNote
}

export const Target = ({ note, ...rest }: TargetProps) => (
    <Link
        href={`/${note.user.username}/${note.id}`}
        className="font-semibold text-sm hover:underline hover:text-primary"
        {...rest}
    >
        {note.user.username}  / {note.title}
    </Link>
)