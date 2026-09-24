import { clsx } from 'clsx';
import NextLink, { LinkProps } from 'next/link';

export const Link = ({ href, children, ...rest }: LinkProps & { children: React.ReactNode }) => (
    <NextLink
        {...rest}
        href={href}
        className={clsx(
            'px-2 py-1.5 rounded-md',
            'text-nowrap text-center text-sm insm:text-xs',
            'dark:text-midlight text-middark',
            'dark:bg-middark bg-midlight',
            'hover:opacity-90 focus:opacity-90 focus-visible:opacity-90 active:opacity-90',
        )}
    >
        {children}
    </NextLink>
)