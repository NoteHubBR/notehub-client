import { Comment } from "@/core";
import { Component } from "@/components";
import { useRef } from "react";
import Link from "next/link";

interface UsernameProps extends React.HTMLAttributes<HTMLParagraphElement> {
    comment: Comment
}

export const Username = ({ comment, ...rest }: UsernameProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    return (
        <>
            <Component.Hovercard ref={ref} user={comment.user} />
            <Link ref={ref} href={`/${comment.user.username}`}>
                <p
                    className="text-sm hover:dark:text-secondary hover:text-primary transition-colors"
                    {...rest}
                >
                    @{comment.user.username}
                </p>
            </Link>
        </>
    )

}