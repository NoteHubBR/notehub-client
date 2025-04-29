import { Icon } from "@/components/icons";
import { LowDetailUser } from "@/core";
import { Photo } from "@/components/Photo";
import Link, { LinkProps } from "next/link";

interface UserProps extends Omit<LinkProps, 'href'> {
    user: LowDetailUser;
}

export const User = ({ user, ...rest }: UserProps) => (
    <Link
        href={`/${user.username}`}
        className="w-fit group/user center flex flex-col items-center gap-1"
        {...rest}
    >
        <Photo user={user} size={75} />
        <figcaption
            className="max-w-[150px] py-1 px-2 rounded
            flex items-center gap-1
            dark:bg-lighter/30 bg-darker/30
            backdrop-blur moz:backdrop-blur-none"
        >
            <Icon.Sponsor user={user} size={24} className="drop-shadow-alpha-d-sm" />
            <span
                className="truncate group-hover/user:underline
                text-sm decoration-2 text-white
                drop-shadow-alpha-d-sm"
            >
                @{user.username}
            </span>
        </figcaption>

    </Link>
)