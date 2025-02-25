import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { useUser } from "@/data/hooks";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    icon?: React.ReactNode;
    text?: string;
    strong?: boolean;
    reverse?: boolean;
}

export const Link = (props: LinkProps) => {

    const { icon, text, strong, reverse, ...rest } = props;

    const { user } = useUser();
    const pathname = usePathname();
    const href = String(rest.href);

    if (!user) return null;
    const userRoute = `/${user.username}`;

    const active =
        href === "/"
            ? pathname === "/"
            : href === userRoute
                ? pathname === userRoute
                : pathname === href || pathname.startsWith(`${href}/`);

    const Span = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLSpanElement>) => {
        return <span className={`overflow-hidden whitespace-nowrap text-ellipsis text-center ${className}`} {...rest} />
    }

    return (
        <div className={clsx(
            'cursor-pointer',
            'rounded-md',
            active
                ? 'text-neutral-50 bg-violet-600'
                : 'hover:dark:bg-neutral-50/15 hover:bg-neutral-900/15',
            'transition-colors'
        )}>
            <NextLink className="py-1 px-2 flex items-center gap-3 "{...rest}>
                {!reverse
                    ?
                    <>
                        {icon && icon}
                        {strong
                            ?
                            <strong><Span className="text-md">{text}</Span></strong>
                            :
                            <Span className="text-sm">{text}</Span>
                        }
                    </>
                    :
                    <>
                        {strong
                            ?
                            <strong><Span className="text-md">{text}</Span></strong>
                            :
                            <Span className="text-sm">{text}</Span>
                        }
                        {icon && icon}
                    </>
                }
            </NextLink>
        </div>
    )

}