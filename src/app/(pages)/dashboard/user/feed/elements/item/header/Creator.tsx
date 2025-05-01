import { Component } from "@/components";
import { IconNotes } from "@tabler/icons-react";
import { LowDetailUser } from "@/core";
import Link from "next/link";

interface CreatorProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    user: LowDetailUser
}

export const Creator = ({ user, ...rest }: CreatorProps) => (
    <Link href={`/${user.username}`} className="relative">
        <Component.Photo user={user} size={40} className="relative" {...rest} />
        <figcaption
            className="absolute -bottom-1 -right-1
            p-[2px] rounded-full
            border-2 dark:border-dark border-light
            bg-slate-400"
        >
            <IconNotes size={18} className="text-white fill-primary" />
        </figcaption>
    </Link>
)