import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";

interface TagProps extends Omit<LinkProps, 'href'> {
    tag: string;
}

export const Tag = ({ tag, ...rest }: TagProps) => {
    return (
        <li>
            <Link
                href={`/search?type=tags&q=${tag}`}
                className={clsx(
                    'w-fit px-2 py-1 rounded-full',
                    'border dark:border-secondary/25 border-primary',
                    'font-semibold text-xs dark:text-secondary text-primary',
                    'dark:bg-secondary/25 bg-primary/10',
                    'hover:!text-white dark:hover:bg-secondary hover:bg-primary',
                )}
                {...rest}
            >
                {tag}
            </Link>
        </li>
    )
}