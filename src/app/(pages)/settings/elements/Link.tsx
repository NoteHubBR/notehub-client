import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    icon: React.ElementType;
    children: React.ReactNode;
}

export const Link = ({ children, icon: Icon, href, ...rest }: LinkProps) => {

    const pathname = usePathname();
    const onRoute = pathname === href || pathname.startsWith(String(href));

    return (
        <li
            className={clsx(
                'pl-2 border-l-4',
                onRoute ? 'border-primary' : 'border-transparent'
            )}
        >
            <NextLink
                href={href}
                className={clsx(
                    'px-2 py-3',
                    'flex items-center justify-between',
                    onRoute ? 'dark:bg-middark/30 bg-midlight/30' : 'bg-transparent',
                    'hover:dark:bg-middark/30 hover:bg-midlight/30'
                )}
                {...rest}
            >
                {children}
                <Icon size={20} />
            </NextLink>
        </li>
    )

}