'use client';

import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

export const Li = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => {

    const pathname: string = usePathname();
    const onRoute: boolean = rest.href === pathname;

    return (
        <li className={clsx(
            'relative',
            'py-4',
            onRoute && 'after:pointer-events-none after:absolute after:w-full after:left-0 after:bottom-0 after:border after:border-violet-600'
        )}
        >
            <Link
                className={clsx(
                    'relative whitespace-nowrap',
                    'py-1 px-2 inlg:px-1 rounded-md flex items-center gap-1 inlg:gap-[2px]',
                    'font-semibold text-md inlg:text-sm',
                    onRoute && 'dark:bg-neutral-50/10 bg-neutral-900/10 text-violet-600',
                    'hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10',
                    'transition-colors'
                )}
                {...rest}
            >
                {children}
            </Link>
        </li>
    )

}