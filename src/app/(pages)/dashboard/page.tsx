'use client';

import { Device } from "@/components/devices";
import { Guest } from "./guest";
import { User } from "./user";
import { useStore, useUser } from "@/data/hooks";
import { Welcome } from "./welcome";
import { Expired } from "./expired";

export default function Dashboard() {

    const { store } = useStore();
    const { user } = useUser();

    const { isFirstTimer, isGuest, isExpired } = store;

    if (!store) return null;

    if (isFirstTimer) return <Welcome />;

    if (isGuest) return <Guest />;

    if (user) return (
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

    if (isExpired) return <Expired />;

    return <></>;

}