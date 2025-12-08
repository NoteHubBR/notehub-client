import { clsx } from "clsx";
import { IconCheck } from "@tabler/icons-react";

export const Benefit = ({ children, ...rest }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
        className="w-fit flex items-center gap-2"
        {...rest}
    >
        <div
            aria-hidden='true'
            className={clsx(
                'p-[2px] rounded-full',
                'bg-gradient-to-r',
                'dark:from-secondary dark:to-inverted',
                'from-primary to-inverted',
            )}
        >
            <div className="p-1 rounded-full dark:bg-darker bg-lighter">
                <IconCheck strokeWidth={3} size={14} className="dark:text-light text-dark" />
            </div>
        </div>
        <p className="font-meidum text-sm dark:text-light text-dark">{children}</p>
    </li>
)