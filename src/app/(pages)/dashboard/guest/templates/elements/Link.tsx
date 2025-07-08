import { IconArrowRight } from "@tabler/icons-react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends Omit<NextLinkProps, "href"> {
    children: React.ReactNode;
}

export const Link = ({ children, ...rest }: LinkProps) => (
    <NextLink
        href="/signup"
        className="invitation-btn group
        w-[166.6px] h-[44px]
        inmd:mx-auto
        insm:w-[133px] insm:h-[36px]
        rounded px-4 py-2
        flex items-center justify-center gap-3
        tracking-wider text-xl insm:text-sm dark:text-darker text-lighter
        dark:bg-lighter bg-darker
        hover:!text-white hover:gap-1
        focus:!text-white focus:gap-1"
        {...rest}
    >
        <span className="group-hover:scale-[85%] group-focus:scale-[85%] transition-all duration-500">
            {children}
        </span>
        <span className="group-hover:scale-90 group-focus:scale-90 transition-all duration-500">
            <IconArrowRight size={18} />
        </span>
    </NextLink>
)