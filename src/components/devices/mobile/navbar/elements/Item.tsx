import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
    href: string;
    icon?: React.ElementType;
}

export const Item = ({ href, icon: Icon, children, className, ...rest }: ItemProps) => {

    const onPathname: boolean = href === usePathname();

    return (
        <li className={className} {...rest}>
            <Link href={href}>
                {Icon
                    ? <Icon
                        size={24}
                        className={clsx(
                            'transition-colors duration-300',
                            onPathname
                                ? 'dark:text-white text-black'
                                : 'dark:text-neutral-400 text-neutral-600'
                        )}
                    />
                    : children
                }
            </Link>
        </li>
    )

}