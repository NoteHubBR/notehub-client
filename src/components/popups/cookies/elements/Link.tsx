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
            'dark:hover:bg-semidark hover:bg-semilight',
            'dark:focus:bg-semidark focus:bg-semilight',
            'dark:focus-visible:bg-semidark focus-visible:bg-semilight',
            'dark:active:bg-semidark active:bg-semilight',
        )}
    >
        {children}
    </NextLink>
)