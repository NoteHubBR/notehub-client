'use client';

import { shouldUseUserContext } from "@/core";
import { useLoading, useScreen, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
};

const Page = (props: PageProps) => {

    const { className, children, ...rest } = props;

    const pathname = usePathname();

    const { store: { isMenuOpen }, user } = useUser();

    const { onDesktop } = useScreen();

    const { isLoaded } = useLoading();

    if (!isLoaded) return null;

    const shouldUseMargin = shouldUseUserContext(pathname);

    return (
        <div className={`${shouldUseMargin && onDesktop && user ? `${isMenuOpen ? "pl-[240px]" : "pl-[88px]"}` : ''} ${className}`}
            {...rest}
        >
            {children}
        </div>
    );

};

export default Page;