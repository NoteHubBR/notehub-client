import { Icon } from "@/components/icons";
import { IconSearch } from "@tabler/icons-react";
import NextLink, { LinkProps } from "next/link";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const Link = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => {
        return (
            <NextLink
                className="relative p-1 rounded-full hover:dark:bg-lighter/10 hover:bg-dark/10 transition-colors"
                {...rest}
            >
                {children}
            </NextLink>
        )
    }

    return (
        <header
            className="py-2 px-4 flex items-center justify-end gap-4 dark:bg-darker bg-lighter"
            {...props}
        >
            <Icon.Logo width={77} height={0} className="mr-auto" />
            <Link href={'/m/search'}><IconSearch /></Link>
        </header>
    )

}