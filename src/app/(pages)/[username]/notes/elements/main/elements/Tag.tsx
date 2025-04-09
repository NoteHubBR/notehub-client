import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";

interface TagProps extends Omit<LinkProps, 'href'> {
    tag: string;
}

export const Tag = ({ tag, ...rest }: TagProps) => {
    return (
        <li>
            <Link
                href={`/search?q=${tag}&scope=tag`}
                className={clsx(
                    'w-fit px-2 py-1 rounded-full',
                    'border border-primary/25',
                    'font-semibold text-xs text-primary',
                    'dark:bg-primary/25 bg-primary/10',
                    'hover:!text-white hover:!bg-primary',
                )}
                {...rest}
            >
                {tag}
            </Link>
        </li>
    )
}