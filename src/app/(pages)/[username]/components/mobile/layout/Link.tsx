import NextLink, { LinkProps } from 'next/link';

export const Link = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => {
    return (
        <NextLink
            aria-label="Editar"
            className="p-2 rounded-full
            dark:text-white text-black
            dark:bg-black bg-white
            drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]"
            {...rest}
        >
            {children}
        </NextLink>
    )
}