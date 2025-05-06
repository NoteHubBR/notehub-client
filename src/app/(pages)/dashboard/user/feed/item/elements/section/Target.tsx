import { Component } from "@/components";
import { LowDetailNote } from "@/core";
import Link, { LinkProps } from "next/link";
import { useRef } from "react";

interface TargetProps extends Omit<LinkProps, 'href'> {
    note: LowDetailNote
}

export const Target = ({ note, ...rest }: TargetProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    return (
        <>
            <Component.Hovercard ref={ref} user={note.user} />
            <header className="flex items-center gap-2">
                <Link ref={ref} href={`/${note.user.username}`}>
                    <Component.Photo user={note.user} size={25} />
                </Link>
                <Link
                    href={`/${note.user.username}/${note.id}`}
                    className="font-semibold text-sm hover:underline hover:text-secondary"
                    {...rest}
                >
                    {note.user.username}  / {note.title}
                </Link>
            </header>
        </>
    )

}