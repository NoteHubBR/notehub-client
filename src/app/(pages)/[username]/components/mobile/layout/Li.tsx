import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { IconCaretDown } from "@tabler/icons-react";

export const Li = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => {
    const pathname: string = usePathname();
    const onRoute: boolean = rest.href === pathname;
    return (
        <li
            className={clsx(
                'relative',
                'p-2 rounded-full',
                onRoute
                    ? 'text-white fill-white bg-primary'
                    : 'text-primary bg-white',
                'drop-shadow-alpha-d-sm',
                'transition-colors duration-300'
            )}
        >
            <Link
                {...rest}
            >
                {children}
            </Link>
            <span className={clsx(
                'pointer-events-none absolute',
                onRoute
                    ? 'opacity-100 top-full left-1/2 -translate-x-1/2 rotate-0'
                    : 'opacity-0 top-0 left-1/2 -translate-x-1/2 rotate-180',
                'transition-all duration-300'
            )}>
                <IconCaretDown className="fill-primary text-primary animate-bounce" />
            </span>
        </li>
    )
}