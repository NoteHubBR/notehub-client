'use client';

import { useLoading, useUser } from "@/data/hooks";
import { User } from "@/core";
import Link from "next/link";

export default function Home() {

  const { isLoaded } = useLoading();

  const { store, setStore, user } = useUser();

  const initAsGuest = () => { setStore({ isFirstTimer: false, isGuest: true }); }

  const Elements = (user: User) => {
    return (
      <>
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <h1>{user.notifications}</h1>
        <h1>{user.followers_count}</h1>
        <h1>{user.following_count}</h1>
        {/* <button onClick={() => getNotifications(token.access_token)}>ver notificações</button> */}
      </>
    )
  }

  if (!isLoaded || !store) return <></>

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {store.isFirstTimer &&
        <>
          <div>be welcome</div>
          <Link href={'/signin'} className="request-btn">Logar</Link>
          <button onClick={initAsGuest} className="request-btn">Explorar</button>
        </>
      }
      {user &&
        <>
          <Elements {...user} />
        </>
      }
      {store.isGuest &&
        <>
          <h1>Hello Guest!</h1>
          <Link href={'/signin'} className="request-btn">Logar</Link>
        </>
      }
    </div>
  );

}