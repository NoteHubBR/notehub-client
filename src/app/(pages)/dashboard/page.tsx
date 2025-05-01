'use client';

import { Device } from "@/components/devices";
import { useNotes } from "@/data/hooks";
import { User } from "./user";

export const Page = () => {

    const { notes } = useNotes();

    return (
        <main className="h-full w-full flex flex-col">
            <Device.Mobile.Header.MainHeader />
            <section
                className="px-3 flex-1 flex justify-center gap-6
                inlg:flex-col-reverse inlg:gap-0"
            >
                <User.Feed notes={notes} />
                <User.Aside />
            </section>
        </main>
    )

}

export default Page;