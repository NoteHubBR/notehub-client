import { IconNotes } from "@tabler/icons-react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    children: React.ReactNode;
}

export const Link = ({ children, ...rest }: Omit<LinkProps, 'href'>) => {
    return (
        <li>
            <NextLink
                href={'/new'}
                className="px-2 py-1 rounded-xl
                flex items-center gap-1
                border border-primary
                text-white bg-primary
                hover:text-primary hover:dark:bg-primary/25 hover:bg-primary/15
                transition-colors"
                {...rest}
            >
                <IconNotes size={22} />
                {children}
            </NextLink>
        </li>
    )
}