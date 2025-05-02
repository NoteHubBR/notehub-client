'use client';

import { Device } from "@/components/devices";
import { User } from "./user";

export const Page = () => {

    return (
        <main className="h-full w-full flex flex-col dark:bg-dark bg-light">
            <Device.Mobile.Header.MainHeader />
            <section
                className="px-3 flex-1 flex justify-center gap-3
                inlg:flex-col-reverse inlg:justify-end inlg:gap-0
                inmd:flex-col inmd:justify-start"
            >
                <User.Feed />
                <User.Aside />
            </section>
        </main>
    )

}

export default Page;