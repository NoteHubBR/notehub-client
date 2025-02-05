import { IconFlame } from "@tabler/icons-react";
import { Notification as PropsType, toRelativeTime, Type } from "@/core";
import { Photo } from "@/components/Photo";
import Link from "next/link";

export const Notification = ({ notification }: { notification: PropsType }) => {

    const {
        from_user: user,
        read,
        info: {
            type,
            target,
            message: text
        }
    } = notification;

    const href = type === Type.FOLLOWER ? `/${user.username}` : `/${user.username}/${target}`;

    const emote: string | null = type === Type.FOLLOWER ? '👀' : Type.COMMENT ? '🗣' : Type.REPLY ? '🗣' : null;

    const [username, message] = [
        text.split(' ').filter(word => word.startsWith('@')),
        text.split(' ').filter(word => !word.startsWith('@')).join(' ')
    ]

    const relativeTime = toRelativeTime(notification.created_at);

    return (
        <Link
            href={`${href}`}
            className={`py-2 hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10 transition-colors ${read ? '' : 'dark:bg-neutral-50/10 bg-neutral-900/10'}`}
        >
            <div className="w-full flex items-center">
                <div className="px-2 border-r text-sm dark:border-r-neutral-50/20 border-r-neutral-900/20">
                    <Photo user={user} size={55} />
                </div>
                <div className="px-2">
                    <p>
                        <span>{emote ? emote : <IconFlame fill="#6d28d9" color="#7c3aed" />} </span>
                        <span className="font-semibold text-violet-600">{username} </span>
                        {message}
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <span className="pr-2 text-xs dark:text-neutral-50/50 text-neutral-900/50">{relativeTime}</span>
            </div>
        </Link>
    )

}