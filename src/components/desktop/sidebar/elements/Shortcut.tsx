import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ShortcutProps extends React.HTMLAttributes<HTMLDivElement> {
    href: string;
    icon: React.ReactNode;
    text: string;
}

export const Shortcut = (props: ShortcutProps) => {

    const { href, icon, text, ...rest } = props;

    const pathname = usePathname();

    return (
        <div {...rest}>
            <Link
                href={href}
                className={clsx(
                    'cursor-pointer',
                    'py-3 px-1',
                    'flex flex-col items-center gap-1',
                    'rounded-xl',
                    pathname === href
                        ? 'text-neutral-50 bg-violet-600'
                        : 'hover:dark:bg-neutral-50/15 hover:bg-neutral-900/15',
                    'transition-colors'
                )}
            >
                {icon}
                <span className="text-center text-sm">{text}</span>
            </Link>
        </div>
    )

}