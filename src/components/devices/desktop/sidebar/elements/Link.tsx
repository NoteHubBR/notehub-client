import { clsx } from "clsx";
import { Icon } from "@/components/icons";
import { LowDetailUser, User } from "@/core";
import { usePathname } from "next/navigation";
import { useUser } from "@/data/hooks";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    user?: User | LowDetailUser;
    icon?: React.ReactNode;
    useBadge?: 'dev' | 'sponsor' | 'none';
    useBlur?: boolean;
    text?: string;
    strong?: boolean;
    reverse?: boolean;
}

const Span = ({ useBlur, className, ...rest }: { useBlur?: boolean } & React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        className={clsx(
            'text-center truncate',
            useBlur ? 'blur' : 'blur-none',
            className,
        )}
        {...rest}
    />
)

export const Link = (props: LinkProps) => {

    const { user, icon, text, strong, reverse, useBadge, useBlur, ...rest } = props;

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

    return (
        <div className={clsx(
            'cursor-pointer rounded-md',
            active
                ? 'text-lighter bg-primary'
                : 'dark:hover:bg-semilight/15 hover:bg-semidark/15',
            'transition-colors'
        )}>
            <NextLink
                aria-current={active ? 'page' : undefined}
                className="py-1 px-2 flex items-center gap-3"
                {...rest}
            >
                {!reverse
                    ?
                    <>
                        {icon && icon}
                        {user && useBadge === 'dev' && <Icon.Dev user={user} size={22} useWhite={active} className="-mr-2" />}
                        {user && useBadge === 'sponsor' && <Icon.Sponsor user={user} size={22} useWhite={active} className="-mr-2" />}
                        {user && useBadge === 'none' && null}
                        {strong
                            ?
                            <strong><Span useBlur={useBlur} className="text-md">{text}</Span></strong>
                            :
                            <Span useBlur={useBlur} className="text-sm">{text}</Span>
                        }
                    </>
                    :
                    <>
                        {strong
                            ?
                            <strong><Span useBlur={useBlur} className="text-md">{text}</Span></strong>
                            :
                            <Span useBlur={useBlur} className="text-sm">{text}</Span>
                        }
                        {icon && icon}
                    </>
                }
            </NextLink>
        </div>
    )

}