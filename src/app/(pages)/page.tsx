'use client';

import { Container } from "@/components/template/Container";
import { useLoading, useServices, useUser } from "@/data/hooks";
import Link from "next/link";

export default function Home() {

  const { isLoaded } = useLoading();

  const { isFirstTime, isGuest, user, setIsGuest } = useUser();

  const { userService: { getUserNotifications } } = useServices();

  const getNotifications = async (token: string) => {
    try {
      const array = await getUserNotifications(token)
      console.log(array)
    } catch (errors) {
      console.log(errors)
    }
  }

  const initAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    setIsGuest(true);
  }

  return (
    <Container>
      {isLoaded &&
        <>
          {isFirstTime &&
            <Container className="flex flex-col items-center justify-center gap-4">
              <div>be welcome</div>
              <Link href={'/signin'} className="request-btn">Logar</Link>
              <button onClick={initAsGuest} className="request-btn">Explorar</button>
            </Container>
          }
          {user &&
            <>
              {/* <h1>{user.username}</h1>
              <h1>{user.email}</h1>
              <h1>{user.notifications}</h1>
              <h1>{user.followers_count}</h1>
              <h1>{user.following_count}</h1> */}
              {/* <button onClick={() => getNotifications(token.access_token)}>ver notificações</button> */}
            </>
          }
          {isGuest &&
            <>
              <Container className="flex flex-col items-center justify-center gap-4">
                <h1>Hello Guest!</h1>
                <Link href={'/signin'} className="request-btn">Logar</Link>
              </Container>
            </>
          }
        </>
      }
    </Container>
  );

}