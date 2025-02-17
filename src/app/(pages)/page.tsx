'use client';

import { useNotifications, useStore, useUser } from "@/data/hooks";
import { User } from "@/core";
import Link from "next/link";

export default function Home() {

  const { store, setStore } = useStore();
  const { user } = useUser();
  const { count } = useNotifications();

  const { isFirstTimer, isGuest, isExpired } = store;

  const initAsGuest = () => { setStore({ isFirstTimer: false, isGuest: true }); }

  const Elements = (user: User) => {
    return (
      <>
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <h1>notifications: {count}</h1>
        <h1>followers: {user.followers_count}</h1>
        <h1>following: {user.following_count}</h1>
        {/* <button onClick={() => getNotifications(token.access_token)}>ver notificações</button> */}
      </>
    )
  }

  if (!store) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
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
          <Elements {...user} />
        </>
      }
      {isExpired &&
        <>
          <h1>Sua sessão expirou!</h1>
          <Link href={'/signin'} className="request-btn">Logar</Link>
        </>
      }
    </div >
  );

}