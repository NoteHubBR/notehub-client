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
                font-semibold text-md text-center dark:text-lighter text-dark
                rounded-md
                dark:bg-dark/75 bg-lighter/75
                dark:hover:bg-primary hover:bg-primary hover:text-lighter
                dark:focus:bg-primary focus:bg-primary focus:text-lighter
                transition-all
            '
            {...rest}
        >
            {children}
        </NextLink>
    )

}

export default Link;