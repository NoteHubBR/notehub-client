import { Component } from "@/components";
import { Icon } from "@/components/icons";
import { LowDetailUser } from "@/core";
import { Photo } from "@/components/Photo";
import { useRef } from "react";
import Link from "next/link";

export const User = ({ user }: { user: LowDetailUser }) => {

    const photoRef = useRef<HTMLAnchorElement>(null);
    const nameRef = useRef<HTMLAnchorElement>(null);

    return (
        <>
            <Component.Hovercard ref={photoRef} user={user} />
            <Link ref={photoRef} href={`/${user.username}`}>
                <Photo user={user} size={44} className="absolute top-0 left-0" />
            </Link>
            <Component.Hovercard ref={nameRef} user={user} />
            <Link ref={nameRef} href={`/${user.username}`}>
                <h4 className="truncate w-[150px] hover:underline hover:text-secondary">
                    <Icon.Sponsor user={user} size={24} className="mr-1" />
                    {user.display_name}
                </h4>
            </Link>
        </>
    )

}