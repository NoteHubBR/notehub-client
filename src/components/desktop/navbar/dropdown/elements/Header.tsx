import { Icon } from "@/components/icon";
import { User } from "@/core";
import Link from "next/link";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    user: User;
}

export const Header = ({ children, user, ...rest }: HeaderProps) => {
    return (
        <header className="p-4 flex items-center gap-4" {...rest} >
            {children}
            <div className="flex flex-col text-start">
                <span className="max-w-[200px] text-md font-faculty truncate">
                    {user.display_name}
                </span>
                <span className="max-w-[200px] flex gap-1 text-md font-faculty truncate">
                    <Icon.Sponsor isSponsor={user.sponsor} size={24} />
                    @{user.username}
                </span>
                <Link href={`/${user.username}`} className="mt-1 text-sm font-bold text-primary">Acessar perfil</Link>
            </div>
        </header>
    )
}