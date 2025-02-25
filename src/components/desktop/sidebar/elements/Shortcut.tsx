import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

interface ShortcutProps extends LinkProps {
    icon: React.ReactNode;
    text: string;
}

export const Shortcut = (props: ShortcutProps) => {

    const { icon, text, ...rest } = props;

    const pathname = usePathname();

    return (
        <Link
            className={clsx(
                'cursor-pointer',
                'py-3 px-1',
                'flex flex-col items-center gap-1',
                'rounded-xl',
                pathname === rest.href
                    ? 'text-neutral-50 bg-violet-600'
                    : 'hover:dark:bg-neutral-50/15 hover:bg-neutral-900/15',
                'transition-colors'
            )}
            {...rest}
        >
            {icon}
            <span className="text-center text-sm">{text}</span>
        </Link>
    )

}