import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";

interface SpanProps extends LinkProps {
    className?: string;
    children: React.ReactNode;
}

export const Span = ({ className, children, href, ...rest }: SpanProps) => (
    <Link
        href={href}
        className={clsx(
            'font-medium text-xs dark:text-secondary text-primary',
            'hover:underline',
            className
        )}
        {...rest}
    >
        {children}
    </Link>
)