'use client';

import { Device } from "@/components/devices";
import { Feed } from "./feed";
import { useNotes, useStore, useUser } from "@/data/hooks";
import Link from "next/link";

export default function Home() {

  const { store, setStore } = useStore();
  const { user } = useUser();
  const { notes } = useNotes();

  const { isFirstTimer, isGuest, isExpired } = store;

  const initAsGuest = () => { setStore({ isFirstTimer: false, isGuest: true }); }

  if (!store) return null;

  return (
    <main className="h-full flex flex-col">
      <Device.Mobile.Header.MainHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
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
            <Feed notes={notes} />
          </>
        }
        {isExpired &&
          <>
            <h1>Sua sessão expirou!</h1>
            <Link href={'/signin'} className="request-btn">Logar</Link>
          </>
        }
      </div>
    </main>
  )

}