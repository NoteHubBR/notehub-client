import { Comment } from "@/core";
import { Hovercard, Photo } from "@/components";
import { useRef } from "react";
import Link from "next/link";

interface UserProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    comment: Comment;
}

export const User = ({ comment, ...rest }: UserProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    if (comment.user) return (
        <>
            <Hovercard ref={ref} user={comment.user} />
            <Link ref={ref} href={`/${comment.user.username}`}>
                <Photo user={comment.user} size={40} {...rest} />
            </Link>
        </>
    )

    return <Photo user={comment.user} size={40} {...rest} />;

}