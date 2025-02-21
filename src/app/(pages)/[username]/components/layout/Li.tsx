import Link, { LinkProps } from "next/link";

export const Li = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => {
    return (
        <li className="relative py-4
            after:pointer-events-none after:absolute
            after:w-full after:left-0 after:bottom-0 after:border after:border-violet-600"
        >
            <Link
                className="relative
                py-1 px-2 rounded-md flex items-center gap-1
                font-semibold text-violet-600
                hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10
                transition-colors"
                {...rest}
            >
                {children}
            </Link>
        </li>
    )
}