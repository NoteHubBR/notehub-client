import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";

interface ButtonLinkProps extends LinkProps {
    className: string;
    children: React.ReactNode;
}

export const ButtonLink = ({ className, children, href, ...rest }: ButtonLinkProps) => (
    <Link
        href={href}
        className={clsx(
            'group',
            'w-[300px] inmd:w-[270px] h-[40px] rounded-full',
            'flex items-center justify-center',
            'font-semibold',
            'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
            'hover:opacity-75',
            'transition-opacity',
            className
        )}
        {...rest}
    >
        <span className="inline-block group-hover:scale-110 transition-transform duration-300">
            {children}
        </span>
    </Link>
)