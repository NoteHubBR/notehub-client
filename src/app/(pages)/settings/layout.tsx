'use client';

import { Element } from "./elements";
import { usePathname } from "next/navigation";
import { useScreen } from "@/data/hooks";

const Layout = (props: any) => {

    const pathname = usePathname();
    const onPathname = pathname === "/settings";
    const { onDesktop } = useScreen();

    const { Aside, Main } = Element;

    return (
        <section className="w-full h-full px-4 inmd:px-0 flex items-center justify-center dark:bg-darker bg-lighter">
            <div className="max-w-[999px] w-full min-h-[75%] inmd:h-full flex">
                <Aside onDesktop={onDesktop} onPathname={onPathname} />
                <Main onPathname={onPathname}>
                    {props.children}
                </Main>
            </div>
        </section>
    )

}

export default Layout;