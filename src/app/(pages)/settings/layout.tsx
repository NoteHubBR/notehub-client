'use client';

import { Element } from "./elements";
import { Template } from "@/components/templates";
import { usePathname } from "next/navigation";
import { useScreen, useUser } from "@/data/hooks";

const Layout = (props: any) => {

    const pathname = usePathname();
    const onPathname = pathname === "/settings";

    const { onDesktop } = useScreen();
    const { isMounted, user } = useUser();

    const { Aside, Main } = Element;

    if (!isMounted) return <></>;

    if (user) return (
        <section className="w-full h-full px-4 inmd:px-0 flex items-center justify-center dark:bg-darker bg-lighter">
            <div className="max-w-[999px] w-full min-h-[75%] inmd:h-full flex">
                <Aside onDesktop={onDesktop} onPathname={onPathname} />
                <Main onPathname={onPathname}>
                    {props.children}
                </Main>
            </div>
        </section>
    )

    return < Template.Forbidden />;

}

export default Layout;