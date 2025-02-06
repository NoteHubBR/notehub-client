import { IconFlame } from "@tabler/icons-react";
import { Notification as PropsType, toRelativeTime, Type } from "@/core";
import { Photo } from "@/components/Photo";
import { useCallback, useState } from "react";
import Link from "next/link";

export const Notification = ({ notification }: { notification: PropsType }) => {

    const {
        from_user: user,
        info: {
            type,
            target,
            message: text
        }
    } = notification;

    const getHref = (type: Type): string => {
        if (type === Type.FOLLOWER) return `/${user.username}`;
        else return `/${user.username}/${target}`;
    }

    const getEmote = (type: Type): string | null => {
        switch (type) {
            case Type.FOLLOWER: return '👀';
            case Type.COMMENT:
            case Type.REPLY: return '🗣';
            default: return null;
        }
    }

    const href = getHref(type);
    const emote = getEmote(type);
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
            className={`py-2 hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10 transition-colors`}
        >
            <article className="w-ull">
                <main className="flex items-center">
                    <figure className="px-2 border-r text-sm dark:border-r-neutral-50/20 border-r-neutral-900/20">
                        <Photo user={user} size={55} />
                    </figure>
                    <section className="px-2">
                        <p>
                            <span>{emote ? emote : <IconFlame fill="#6d28d9" color="#7c3aed" />} </span>
                            <span className="font-semibold text-violet-600">{username} </span>
                            {message}
                        </p>
                    </section>
                </main>
                <footer className="w-full flex justify-end">
                    <p
                        className="flex gap-2 px-2 text-xs dark:text-neutral-50/50 text-neutral-900/50"
                    >
                        <span
                            className={`
                            ${isMouseOnDateField ? 'opacity-100' : 'opacity-0'} 
                            px-2 rounded-full 
                            font-semibold dark:text-white text-black
                            dark:bg-black bg-white
                            transition-opacity duration-200
                        `}
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