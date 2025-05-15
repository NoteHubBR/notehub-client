import { IconChevronRight } from "@tabler/icons-react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    icon: React.ElementType;
    children: React.ReactNode;
}

export const Link = ({ href, icon: Icon, children, ...rest }: LinkProps) => (
    <li>
        <NextLink
            href={href}
            className="px-2 py-3
            flex items-center justify-between gap-6
            text-lg
            hover:dark:bg-middark/30 hover:bg-midlight/30"
            {...rest}
        >
            <Icon size={20} />
            <span className="flex-1">{children}</span>
            <IconChevronRight size={20} />
        </NextLink>
    </li>
)