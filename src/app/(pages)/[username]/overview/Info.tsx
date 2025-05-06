import { clsx } from "clsx";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

interface InfoProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    subtitleClassName?: string;
    href?: string
}

export const Info = ({ children, title, subtitle, subtitleClassName, href }: InfoProps) => {
    return (
        <li className={clsx(
            'flex items-start gap-3 p-3',
            'border-b dark:border-neutral-700/50 border-dark/10',
            'last:border-none last:col-span-2 insm:last:col-span-1',
        )}>
            <figure className="p-2 rounded-full dark:bg-white bg-black dark:text-black text-white">
                {children}
            </figure>
            {href
                ?
                <div className="flex flex-col gap-1">
                    <h3 className="text-md font-medium dark:text-white text-black">{title}</h3>
                    <Link href={href}>
                        <span className={clsx(
                            'w-fit py-1 px-2 rounded-md',
                            'flex items-center gap-1',
                            'dark:text-neutral-400 text-neutral-500',
                            'dark:bg-semilight/15 bg-semidark/15',
                            'hover:!text-secondary',
                            'transition-all duration-200',
                            subtitleClassName
                        )}>
                            {subtitle}
                            <IconExternalLink size={16} />
                        </span>
                    </Link>
                </div>
                :
                <div className="flex flex-col gap-1">
                    <h3 className="text-md font-medium dark:text-white text-black">{title}</h3>
                    <p className={`dark:text-neutral-400 text-neutral-500 ${subtitleClassName}`}>{subtitle}</p>
                </div>
            }
        </li>
    )
}