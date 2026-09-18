import { clsx } from "clsx";
import { LowDetailNote } from "@/core";
import Link, { LinkProps } from "next/link";

export const Title = ({ note, ...rest }: { note: LowDetailNote } & Omit<LinkProps, 'href'>) => (
    <Link
        href={note.user ? `/${note.user.username}/${note.name}` : `/${note.full_name}`}
        className="w-fit"
        {...rest}
    >
        <h2
            className={clsx(
                'underline',
                'font-bold text-lg',
                'hover:text-secondary',
                'transition-colors',
            )}
        >
            {note.name}
        </h2>
    </Link>
)