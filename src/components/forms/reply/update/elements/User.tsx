import { Hovercard, Photo } from "@/components";
import { Reply } from "@/core";
import { useRef } from "react";
import Link from "next/link";

interface UserProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    reply: Reply;
}

export const User = ({ reply, ...rest }: UserProps) => {

    const ref = useRef<HTMLAnchorElement>(null);

    if (reply.user) return (
        <>
            <Hovercard ref={ref} user={reply.user} />
            <Link ref={ref} href={`/${reply.user.username}`}>
                <Photo user={reply.user} size={40} {...rest} />
            </Link>
        </>
    )

    return <Photo user={reply.user} size={40} {...rest} />;

}