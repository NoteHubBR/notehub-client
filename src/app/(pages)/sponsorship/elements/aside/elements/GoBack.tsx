import { clsx } from "clsx";
import { IconArrowLeft } from "@tabler/icons-react";
import Link, { LinkProps } from "next/link";

export const GoBack = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => (
    <Link
        className={clsx(
            'group overflow-hidden invitation-btn',
            'w-[112px]',
            'rounded-md px-4 py-2',
            'flex items-center justify-center gap-3',
            'tracking-wider dark:text-darker text-lighter',
            'dark:bg-lighter bg-darker',
            'hover:!text-white hover:gap-1',
            'focus:!text-white focus:gap-1',
        )}
        {...rest}
    >
        <span className="group-hover:scale-90 group-focus:scale-90 transition-transform duration-500">
            <IconArrowLeft size={18} />
        </span>
        <span className="group-hover:scale-85 group-focus:scale-85 transition-transform duration-500">
            {children}
        </span>
    </Link>
)