'use client';

import { shouldUseUserContext } from "@/core";
import { useLoading, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
};


const Page = (props: PageProps) => {

    const pathname = usePathname();

    const { store: { isMenuOpen }, user } = useUser();

    const shouldUseMargin = shouldUseUserContext(pathname);

    const { isLoaded } = useLoading();

    if (!isLoaded) return null;

    return (
        <div className={shouldUseMargin && user ? `${isMenuOpen ? "ml-[240px]" : "ml-[88px]"}` : ''} {...props}>
            {props.children}
        </div>
    );

};

export default Page;