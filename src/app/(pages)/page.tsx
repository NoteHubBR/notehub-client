'use client';

import { useLoading, useUser } from "@/data/hooks";
import { User } from "@/core";
import Link from "next/link";

export default function Home() {

  const { isLoaded } = useLoading();

  const { isFirstTime, isGuest, user, setIsFirstTime, setIsGuest } = useUser();

  const initAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    setIsGuest(true);
    setIsFirstTime(false);
  }

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

  if (!isLoaded) return <></>

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isFirstTime &&
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
      {isGuest &&
        <>
          <h1>Hello Guest!</h1>
          <Link href={'/signin'} className="request-btn">Logar</Link>
        </>
      }
    </div>
  );

}