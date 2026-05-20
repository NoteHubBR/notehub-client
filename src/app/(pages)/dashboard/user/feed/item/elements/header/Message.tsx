import { Component } from "@/components";
import { Event, FeedEvent, User } from "@/core";
import { Icon } from "@/components/icons";
import { useRef } from "react";
import Link from "next/link";

interface MessageProps extends React.HTMLAttributes<HTMLHeadingElement> {
    user: User;
    event: FeedEvent;
}

export const Message = ({ user, event, ...rest }: MessageProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    const message = (() => {
        switch (event.event) {
            case Event.User_Followed: return user.username === event.related.username ? 'seguiu você' : 'seguiu';
            case Event.Note_Created: return 'criou uma nota';
            case Event.Note_Flamed: return 'inflamou uma nota';
            case Event.Note_Commented: return 'comentou em uma nota';
        }
    })()

    console.log(message);

    return (
        <>
            <Component.Hovercard ref={ref} user={event.actor} />
            <h2 className="text-sm" {...rest}>
                <span>
                    <Link
                        ref={ref}
                        href={`/${event.actor.username}`}
                        className="font-semibold hover:underline hover:text-secondary"
                    >
                        {event.actor.dev
                            ? <Icon.Dev user={event.actor} size={22} className="mr-1.5" />
                            : <Icon.Sponsor user={event.actor} size={22} className="mr-1" />
                        }
                        {event.actor.display_name}
                    </Link>
                </span>
                <span className="ml-1 font-medium dark:text-lighter/75 text-darker/75">
                    {message}
                </span>
            </h2>
        </>
    )

}