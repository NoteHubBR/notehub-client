'use client';

import { shouldUseUserContext } from "@/core";
import { useLoading, useScreen, useStore, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
};

const Page = (props: PageProps) => {

    const { className, children, ...rest } = props;

    const pathname = usePathname();

    const shouldUseMargin = shouldUseUserContext(pathname);

    const { onDesktop, onMobile } = useScreen();

    const { isLoaded } = useLoading();

    const { store: { isMenuOpen } } = useStore();

    const { user } = useUser();

    if (!isLoaded) return null;

    return (
        <div
            className={`
                ${shouldUseMargin && onDesktop && user ? `${isMenuOpen ? "pl-[240px]" : "pl-[88px]"}` : ''}
                ${shouldUseMargin && onMobile ? 'pb-[45px]' : ''}
                ${className}`
            }
            {...rest}
        >
            {children}
        </div>
    );

};

export default Page;