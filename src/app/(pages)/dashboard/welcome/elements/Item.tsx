import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";

interface ItemProps extends LinkProps {
    className?: string;
    children: React.ReactNode;
    target?: "_blank" | "_parent" | "_self" | "_top";
}

export const Item = ({ className, children, target = "_self", href, ...rest }: ItemProps) => (
    <li className="pr-3 border-r dark:border-midlight/50 border-middark/50 last:border-none flex items-center">
        <Link
            href={href}
            target={target}
            className={clsx(
                'font-medium text-xs dark:text-lighter/50 text-darker/50',
                'hover:underline',
                className
            )}
            {...rest}
        >
            {children}
        </Link>
    </li>
)