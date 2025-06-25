import { Component } from "@/components";
import { Icon } from "@/components/icons";
import { LowDetailNote } from "@/core";
import { Photo } from "@/components/Photo";
import { useRef } from "react";
import Link from "next/link";

export const Creator = ({ note }: { note: LowDetailNote }) => {

    const photoRef = useRef<HTMLAnchorElement>(null);
    const nameRef = useRef<HTMLAnchorElement>(null);

    if (note.user) return (
        <>
            <Component.Hovercard ref={photoRef} user={note.user} />
            <Link ref={photoRef} href={`/${note.user.username}`}>
                <Photo user={note.user} size={44} className="absolute top-0 left-0" />
            </Link>
            <Component.Hovercard ref={nameRef} user={note.user} />
            <Link ref={nameRef} href={`/${note.user.username}`}>
                <h4 className="hover:underline hover:text-secondary">
                    <Icon.Sponsor user={note.user} size={24} className="mr-1" />
                    {note.user.display_name}
                </h4>
            </Link>
        </>
    )

    return (
        <>
            <Photo user={note.user} size={44} className="absolute top-0 left-0" />
            <h4 className="line-through text-sm">Deletado</h4>
        </>
    )

}