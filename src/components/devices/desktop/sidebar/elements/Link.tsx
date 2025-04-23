import { clsx } from "clsx";
import { Icon } from "@/components/icons";
import { LowDetailUser, User } from "@/core";
import { usePathname } from "next/navigation";
import { useUser } from "@/data/hooks";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    user?: User | LowDetailUser;
    icon?: React.ReactNode;
    useBadge?: boolean;
    text?: string;
    strong?: boolean;
    reverse?: boolean;
}

export const Link = (props: LinkProps) => {

    const { user, icon, text, strong, reverse, useBadge, ...rest } = props;

    const { user: current } = useUser();
    const pathname = usePathname();
    const href = String(rest.href);

    if (!current) return null;

    const userRoute = `/${current.username}`;

    const active =
        href === "/"
            ? pathname === "/"
            : href === userRoute
                ? pathname === userRoute
                : pathname === href || pathname.startsWith(`${href}/`);

    const Span = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLSpanElement>) => {
        return <span className={`text-center truncate ${className}`} {...rest} />
    }

    return (
        <div className={clsx(
            'cursor-pointer rounded-md',
            active
                ? 'text-lighter bg-primary'
                : 'dark:hover:bg-semilight/15 hover:bg-semidark/15',
            'transition-colors'
        )}>
            <NextLink className="py-1 px-2 flex items-center gap-3" {...rest}>
                {!reverse
                    ?
                    <>
                        {icon && icon}
                        {user && useBadge && <Icon.Sponsor user={user} size={22} useWhite={active} className="-mr-2" />}
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