import { Component } from "@/components";
import { Event, FeedEvent, LowDetailUser } from "@/core";
import { useRef } from "react";
import Link, { LinkProps } from "next/link";

interface TargetProps extends Omit<LinkProps, 'href'> {
    event: FeedEvent;
}

export const Target = ({ event, ...rest }: TargetProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    const related: LowDetailUser | null = (() => {
        switch (event.event) {
            case Event.Note_Created: return event.note.user;
            case Event.Note_Flamed: return event.flame.note.user;
            case Event.Note_Commented: return event.comment.note.user;
            default: return null;
        }
    })()

    const target = (() => {
        switch (event.event) {
            case Event.Note_Created: return `/${event.note.user ? event.note.user.username : 'null'}/${event.note.id}`;
            case Event.Note_Flamed: return `/${event.flame.note.user ? event.flame.note.user.username : 'null'}/${event.flame.note.id}`;
            case Event.Note_Commented: return `/${event.comment.note.user ? event.comment.note.user.username : 'null'}/${event.comment.note.id}`;
            default: return '';
        }
    })()

    const text = (() => {
        switch (event.event) {
            case Event.Note_Created: return `${event.note.user ? event.note.user.username : 'null'} / ${event.note.title}`;
            case Event.Note_Flamed: return `${event.flame.note.user ? event.flame.note.user.username : 'null'} / ${event.flame.note.title}`;
            case Event.Note_Commented: return `${event.comment.note.user ? event.comment.note.user.username : 'null'} / ${event.comment.note.title}`;
            default: return '';
        }
    })()

    if (related) return (
        <>
            <Component.Hovercard ref={ref} user={related} />
            <header className="flex items-center gap-2">
                <Link ref={ref} href={`/${related.username}`}>
                    <Component.Photo user={related} size={25} />
                </Link>
                <Link
                    href={`${target}`}
                    className="font-semibold text-sm hover:underline hover:text-secondary"
                    {...rest}
                >
                    {text}
                </Link>
            </header>
        </>
    )

}