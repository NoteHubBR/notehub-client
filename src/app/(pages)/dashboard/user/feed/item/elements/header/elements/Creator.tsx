import { Component } from "@/components";
import { Event, FeedEvent } from "@/core";
import { IconFlame, IconMessageCircle, IconNotes, IconUser } from "@tabler/icons-react";
import { useRef } from "react";
import Link from "next/link";

interface CreatorProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    event: FeedEvent
}

export const Creator = ({ event, ...rest }: CreatorProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    const icons: Record<Event, JSX.Element> = {
        [Event.User_Followed]: <IconUser size={18} className="text-white fill-primary" />,
        [Event.Note_Created]: <IconNotes size={18} className="text-white fill-primary" />,
        [Event.Note_Flamed]: <IconFlame size={18} className="text-white fill-primary" />,
        [Event.Note_Commented]: <IconMessageCircle size={18} className="text-white fill-primary" />,
    }

    const icon = icons[event.event];

    return (
        <>
            <Component.Hovercard ref={ref} user={event.actor} />
            <Link ref={ref} href={`/${event.actor.username}`} className="relative">
                <Component.Photo user={event.actor} size={40} {...rest} />
                <div
                    className="absolute -bottom-1 -right-1
                    p-[2px] rounded-full
                    border-2 dark:border-dark border-light
                    bg-primary"
                >
                    {icon}
                </div>
            </Link>
        </>
    )

}