'use client';

import { Element } from "./elements";
import { usePathname } from "next/navigation";
import { useScreen, useUser } from "@/data/hooks";
import { NotFound } from "./NotFound";

const Layout = (props: any) => {

    const pathname = usePathname();
    const onPathname = pathname === "/settings";

    const { onDesktop } = useScreen();
    const { user } = useUser();

    const { Aside, Main } = Element;

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

    return <NotFound />;

}

export default Layout;