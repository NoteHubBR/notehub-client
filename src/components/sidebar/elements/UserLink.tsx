import Image from "next/image";

interface UserLinkProps extends React.HTMLAttributes<HTMLDivElement> {
    avatar: string;
    username: string;
}

export const UserLink = (props: UserLinkProps) => {

    const { avatar, username, ...rest } = props;

    return (
        <div className="flex items-center gap-3" {...rest}>
            <Image src={avatar} alt={`avatar de ${username}`} width={27} height={27} className="rounded-full" />
            <span>{username.length > 17 ? `${username.slice(0, 14)}...` : username}</span>
        </div>
    )

}