'use client';

import { Device } from "@/components/devices";
import { useNotes, useStore, useUser } from "@/data/hooks";
import Link from "next/link";
import { Dashboard } from "./dashboard";

export default function Home() {

  const { store, setStore } = useStore();
  const { user } = useUser();
  const { notes } = useNotes();

  const { isFirstTimer, isGuest, isExpired } = store;

  const initAsGuest = () => { setStore({ isFirstTimer: false, isGuest: true }); }

  if (!store) return null;

  return (
    <main className="h-full w-full flex flex-col">
      <Device.Mobile.Header.MainHeader />
      <section
        className="px-3 flex-1 flex justify-center gap-6
        inlg:flex-col-reverse inlg:gap-0"
      >
        {isFirstTimer &&
          <>
            <div>be welcome</div>
            <Link href={'/signin'} className="request-btn">Logar</Link>
            <button onClick={initAsGuest} className="request-btn">Explorar</button>
          </>
        }
        {isGuest &&
          <>
            <h1>Hello Guest!</h1>
            <Link href={'/signin'} className="request-btn">Logar</Link>
          </>
        }
        {user &&
          <>
            <Dashboard.User.Feed notes={notes} />
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