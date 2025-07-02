'use client';

import { Dashboard } from "./dashboard";
import { Device } from "@/components/devices";
import { useStore, useUser } from "@/data/hooks";
import Link from "next/link";

export default function Home() {

  const { store } = useStore();
  const { user } = useUser();

  const { isFirstTimer, isGuest, isExpired } = store;

  if (!store) return null;

  if (isFirstTimer) return <Dashboard.Welcome />;

  return (
    <main className="h-full w-full flex flex-col dark:bg-dark bg-light">
      <Device.Mobile.Header.MainHeader />
      <section
        className="px-3 flex-1 flex justify-center gap-3
        inlg:flex-col-reverse inlg:justify-end inlg:gap-0
        inmd:flex-col inmd:justify-start"
      >
        {isGuest &&
          <>
            <h1>Hello Guest!</h1>
            <Link href={'/signin'} className="request-btn">Logar</Link>
          </>
        }
        {user &&
          <>
            <Dashboard.User.Feed />
            <Dashboard.User.Aside />
          </>
        }
        {isExpired &&
          <>
            <h1>Sua sessão expirou!</h1>
            <Link href={'/signin'} className="request-btn">Logar</Link>
          </>
        }
      </section>
    </main>
  )

}