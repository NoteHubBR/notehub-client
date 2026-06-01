import { Component } from "@/components";
import { Event, FeedEvent, LowDetailUser } from "@/core";
import { Icon } from '@/components/icons';
import { useRef } from "react";
import Link, { LinkProps } from "next/link";

interface TargetProps extends Omit<LinkProps, 'href'> {
    event: FeedEvent;
}

export const Target = ({ event, ...rest }: TargetProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    const related: LowDetailUser | null = (() => {
        switch (event.event) {
            case Event.User_Followed: return event.related;
            default: return null;
        }
    })()

    const target = (() => {
        switch (event.event) {
            case Event.User_Followed: return `/${event.related.username}`;
            default: return '';
        }
    })()

    const username = (() => {
        switch (event.event) {
            case Event.User_Followed: return `${event.related.username}`;
            default: return '';
        }
    })()

    if (related) return (
        <>
            <Component.Hovercard ref={ref} user={related} />
            <header className="flex items-center gap-2">
                <Link ref={ref} href={`/${related.username}`} className='relative'>
                    <Component.Photo user={related} size={44} />
                    {related.dev
                        ? <Icon.Dev user={related} size={18} className="bot-mid-center drop-shadow-alpha-d-md" />
                        : <Icon.Sponsor user={related} size={18} className="bot-mid-center drop-shadow-alpha-d-md" />
                    }
                </Link>
                <div className="min-w-0 flex-1">
                    <Link
                        href={`${target}`}
                        className="block max-w-fit truncate font-semibold text-sm hover:underline hover:text-secondary"
                        {...rest}
                    >
                        @{username}
                    </Link>
                    <p className="truncate font-medium text-sm dark:text-midlight text-middark">
                        {related.display_name}
                    </p>
                </div>
            </header>
        </>
    )

}