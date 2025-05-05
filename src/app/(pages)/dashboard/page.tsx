'use client';

import { Device } from "@/components/devices";
import { User } from "./user";
import { useStore, useUser } from "@/data/hooks";
import Link from "next/link";

export default function Dashboard() {

    const { store, setStore } = useStore();
    const { user } = useUser();

    const { isFirstTimer, isGuest, isExpired } = store;

    const initAsGuest = () => { setStore({ isFirstTimer: false, isGuest: true }); }

    if (!store) return null;

    return (
        <main className="h-full w-full flex flex-col dark:bg-dark bg-light">
            <Device.Mobile.Header.MainHeader />
            <section
                className="px-3 flex-1 flex justify-center gap-3
                inlg:flex-col-reverse inlg:justify-end inlg:gap-0
                inmd:flex-col inmd:justify-start"
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
                        <User.Feed />
                        <User.Aside />
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