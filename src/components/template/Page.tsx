'use client';

import { useMenu } from "@/data/hooks";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
};


const Page = (props: PageProps) => {

    const { isOpen } = useMenu();

    return (
        <div className={`${isOpen ? "ml-[240px]" : "ml-[88px]"}`} {...props}>
            {props.children}
        </div>
    );
};

export default Page;