import { IconBell, IconSearch } from "@tabler/icons-react";
import { useNotifications, useScreen, useUser } from "@/data/hooks";
import Image from "next/image";
import NextLink, { LinkProps } from "next/link";

export const Header = (props: React.HTMLAttributes<HTMLHeadingElement>) => {

    const { onMobile } = useScreen();

    const { user } = useUser();

    const { count } = useNotifications();

    const Link = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => {
        return (
            <NextLink
                className="relative p-1 rounded-full hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10 transition-colors"
                {...rest}
            >
                {children}
            </NextLink>
        )
    }

    if (!onMobile) return null;

    return (
        <header
            className="py-2 px-4 flex items-center justify-end gap-4 dark:bg-neutral-950 bg-neutral-50"
            {...props}
        >
            <Image src={'/imgs/logo.png'} width={77} height={0} alt="Logo" className="mr-auto" />
            {user &&
                <Link href='/m/notifications'>
                    <IconBell />
                    {count > 0 &&
                        <span className="absolute top-0 left-0 
                    w-4 h-4 flex items-center justify-center rounded-full 
                    text-sm text-neutral-50 
                    bg-violet-600"
                        >
                            {count}
                        </span>
                    }
                </Link>
            }
            <Link href={'/m/search'}><IconSearch /></Link>
        </header>
    )

}