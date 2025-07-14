'use client';

import { Dashboard } from "./dashboard";
import { Device } from "@/components/devices";
import { useStore, useUser } from "@/data/hooks";

export default function Home() {

  const { store } = useStore();
  const { user } = useUser();

  const { isFirstTimer, isGuest, isExpired } = store;

  if (!store) return null;

  if (isFirstTimer) return <Dashboard.Welcome />;

  if (isGuest) return <Dashboard.Guest />;

  if (isExpired) return <></>;

  if (user) return (
    <main className="h-full w-full flex flex-col dark:bg-dark bg-light">
      <Device.Mobile.Header.MainHeader />
      <section
        className="px-3 flex-1 flex justify-center gap-3
        inlg:flex-col-reverse inlg:justify-end inlg:gap-0
        inmd:flex-col inmd:justify-start"
      >
        <Dashboard.User.Feed />
        <Dashboard.User.Aside />
      </section>
    </main>
  )

}