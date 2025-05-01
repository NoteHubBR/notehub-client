import Link, { LinkProps } from "next/link";

export const Change = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => (
    <Link target="_blank" className="font-medium text-sm hover:underline hover:text-primary" {...rest} >
        {children}
    </Link>
)