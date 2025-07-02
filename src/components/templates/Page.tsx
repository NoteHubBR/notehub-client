'use client';

import { clsx } from "clsx";
import { shouldUseUserContext } from "@/core";
import { useLoading, useScreen, useStore, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
}

export const Page = (props: PageProps) => {

    const { className, children, ...rest } = props;

    const pathname = usePathname();

    const shouldUseMargin = shouldUseUserContext(pathname);

    const { store: { isGuest, isExpired } } = useStore();
    const { onDesktop, onMobile } = useScreen();
    const { isLoaded } = useLoading();
    const { isMenuOpen } = useStore();
    const { user } = useUser();

    if (!isLoaded) return null;

    return (
        <div
            className={clsx(
                shouldUseMargin && onDesktop && user ? `${isMenuOpen(user) ? "pl-[240px]" : "pl-[88px]"}` : '',
                shouldUseMargin && onMobile && (user || isGuest || isExpired) ? 'pb-[45px]' : '',
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )

}