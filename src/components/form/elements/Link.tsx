import { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";

interface LinkProps extends NextLinkProps {
    children: React.ReactNode;
}

const Link = ({ children, ...rest }: LinkProps) => {

    return (
        <NextLink
            className='
                p-2
                font-semibold text-md text-center dark:text-neutral-50 text-neutral-900
                rounded-md
                dark:bg-neutral-900/75 bg-neutral-50/75
                dark:hover:bg-violet-600 hover:bg-violet-600 hover:text-neutral-50
                dark:focus:bg-violet-600 focus:bg-violet-600 focus:text-neutral-50
                transition-all
            '
            {...rest}
        >
            {children}
        </NextLink>
    )

}

export default Link;