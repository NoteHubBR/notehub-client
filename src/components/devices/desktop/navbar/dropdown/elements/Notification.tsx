import { clsx } from "clsx";
import { Component } from "@/components";
import { Icon } from "@/components/icons";
import { IconFlame, IconMessageUser, IconUserPlus } from "@tabler/icons-react";
import { Notification as PropsType, toRelativeTime, Type } from "@/core";
import { useCallback, useState } from "react";
import Link from "next/link";

export const Notification = ({ notification }: { notification: PropsType }) => {

    const {
        from,
        related,
        info: {
            type,
            target,
            message: text
        }
    } = notification;

    const getHref = (type: Type): string => {
        if (type === Type.FOLLOWER) return `/${related.username}`;
        else if (related === null) return `/user/${target}`;
        else return `/${related.username}/${target}`;
    }

    const getEmote = (type: Type): React.ElementType => {
        switch (type) {
            case Type.FLAME: return IconFlame
            case Type.FOLLOWER: return IconUserPlus
            case Type.COMMENT: return IconMessageUser
            case Type.REPLY: return IconMessageUser
        }
    }

    const href = getHref(type);
    const Emote = getEmote(type);
    const relativeTime = toRelativeTime(notification.created_at);
    const [username, message] = [
        text.split(' ').filter(word => word.startsWith('@')),
        text.split(' ').filter(word => !word.startsWith('@')).join(' ')
    ]

    const [isMouseOnDateField, setIsMouseOnDateField] = useState<boolean>(false);
    const handleMouseEnter = useCallback(() => setIsMouseOnDateField(true), []);
    const handleMouseLeave = useCallback(() => setIsMouseOnDateField(false), []);

    return (
        <Link
            href={`${href}`}
            className={clsx(
                'py-2 rounded-md mx-1 insm:mx-0',
                !notification.read && 'dark:bg-semilight/5 bg-semidark/5',
                'hover:dark:bg-semilight/10 hover:bg-semidark/10',
                'transition-colors'
            )}
        >
            <article className="w-full">
                <section className="flex items-center">
                    <figure className="relative px-2 border-r text-sm dark:border-r-semilight/10 border-r-semidark/10">
                        <Component.Photo user={from} size={55} />
                        <Icon.Sponsor
                            user={from}
                            size={22}
                            className="bot-mid-center drop-shadow-alpha-d-md"
                        />
                    </figure>
                    <section className="px-2">
                        <p className="line-clamp-6 text-sm">
                            <span>{<Emote className="inline-block text-secondary fill-secondary" />}</span>
                            <span className="font-semibold text-secondary"> {username} </span>
                            <span>{message}</span>
                        </p>
                    </section>
                </section>
                <footer className="w-full flex justify-end">
                    <p className="flex gap-2 px-2 text-xs dark:text-lighter/50 text-darker/50">
                        <span
                            className={clsx(
                                isMouseOnDateField ? 'opacity-100' : 'opacity-0',
                                'px-2 rounded-full',
                                'font-semibold dark:text-white text-black',
                                'dark:bg-black bg-white',
                                'transition-opacity duration-200'
                            )}
                        >
                            {notification.created_at}h
                        </span>
                        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {relativeTime}
                        </span>
                    </p>
                </footer>
            </article>
        </Link>
    )

}