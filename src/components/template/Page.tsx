'use client';

import { shouldUseUserContext } from "@/core";
import { useMenu, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
};


const Page = (props: PageProps) => {

    const pathname = usePathname();

    const { user } = useUser();

    const { isOpen } = useMenu();

    const shouldUseMargin = shouldUseUserContext(pathname);

    return (
        <div className={shouldUseMargin && user ? `${isOpen ? "ml-[240px]" : "ml-[88px]"}` : ''} {...props}>
            {props.children}
        </div>
    );

};

export default Page;