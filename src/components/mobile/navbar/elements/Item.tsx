import { usePathname } from "next/navigation";
import Link from "next/link";

interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
    href: string;
    children: React.ReactNode
    text?: string;
}

export const Item = (props: ItemProps) => {

    const { href, children, text, ...rest } = props;

    const pathname = usePathname();

    const IconPlus: boolean = !text;

    return (
        <li
            className={`cursor-pointer underlined ${pathname === href ? 'on' : ''}`}
            {...rest}
        >
            <Link
                href={href}
                className={`
                    py-1
                    flex flex-col items-center 
                    rounded-full
                    ${IconPlus ? 'px-1 dark:bg-neutral-50/10 bg-neutral-900/10' : ''}
                `}
            >
                {children}
                <span className="text-2xs">{text}</span>
            </Link>
        </li>
    )

}