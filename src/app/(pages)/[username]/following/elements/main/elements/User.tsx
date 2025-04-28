import { LowDetailUser } from "@/core";
import { Photo } from "@/components/Photo";
import Link, { LinkProps } from "next/link";

interface UserProps extends Omit<LinkProps, 'href'> {
    user: LowDetailUser;
}

export const User = ({ user, ...rest }: UserProps) => (
    <Link
        href={`/${user.username}`}
        className="w-fit group center flex flex-col items-center"
        {...rest}
    >
        <Photo user={user} size={75} />
        <span className="truncate text-white decoration-2 group-hover:underline ">@{user.username}</span>
    </Link>
)