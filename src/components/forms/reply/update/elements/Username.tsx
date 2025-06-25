import { Component } from "@/components";
import { Reply } from "@/core";
import { useRef } from "react";
import Link from "next/link";

interface UsernameProps extends React.HTMLAttributes<HTMLParagraphElement> {
    reply: Reply
}

export const Username = ({ reply, ...rest }: UsernameProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    if (reply.user) return (
        <>
            <Component.Hovercard ref={ref} user={reply.user} />
            <Link ref={ref} href={`/${reply.user.username}`} className="min-w-0">
                <p
                    className="truncate text-sm hover:dark:text-secondary hover:text-primary transition-colors"
                    {...rest}
                >
                    @{reply.user.username}
                </p>
            </Link>
        </>
    )

    return <p className="line-through text-sm">Deletado</p>;

}