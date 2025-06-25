import { clsx } from "clsx";
import { LowDetailNote } from "@/core";
import Link, { LinkProps } from "next/link";

export const Title = ({ note, ...rest }: { note: LowDetailNote } & Omit<LinkProps, 'href'>) => (
    <Link href={`/${note.user ? note.user.username : 'user'}/${note.id}`} className="w-fit" {...rest}>
        <h2
            className={clsx(
                'underline',
                'font-bold text-lg',
                'hover:text-secondary',
                'transition-colors',
            )}
        >
            {note.title}
        </h2>
    </Link>
)