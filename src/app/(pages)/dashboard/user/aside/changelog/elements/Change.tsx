import { scrollTo } from "@/core";
import Link, { LinkProps } from "next/link";

interface ChangeProps extends Omit<LinkProps, 'href'> {
    toId: string;
    children: React.ReactNode;
}

export const Change = ({ toId, children, ...rest }: ChangeProps) => (
    <Link
        href='/changelog'
        onClickCapture={scrollTo(toId)}
        className="font-medium text-sm hover:underline hover:text-secondary"
        {...rest}
    >
        {children}
    </Link>
)