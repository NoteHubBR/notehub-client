import { User } from "@/core";
import Link from "next/link";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
    children: React.ReactNode;
    user: User;
}

export const Header = ({ children, user, ...rest }: HeaderProps) => {
    return (
        <header className="p-4 flex items-center gap-4" {...rest} >
            {children}
            <div className="flex flex-col text-start">
                <span className="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis text-md font-faculty">
                    {user.display_name}
                </span>
                <span className="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis text-md font-faculty">
                    @{user.username}
                </span>
                <Link href={`/${user.username}`} className="mt-1 text-sm font-bold text-violet-600">Acessar perfil</Link>
            </div>
        </header>
    )
}