import { IconExternalLink } from "@tabler/icons-react";
import NextLink, { LinkProps } from "next/link";

export const Link = (props: Omit<LinkProps, 'href'>) => (
    <NextLink
        href={'/changelog'}
        className="w-fit font-medium text-sm hover:underline hover:text-primary"
        {...props}
    >
        Ver alterações <span className="inline-block align-middle"><IconExternalLink size={14} /></span>
    </NextLink>
)