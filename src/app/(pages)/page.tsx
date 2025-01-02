'use client';

import { useServices, useUser } from "@/data/hooks";

export default function Home() {

  const { user, token } = useUser();

  const { userService: { getUserNotifications } } = useServices();
  
  const getNotifications = async (token: string) => {
    try {
      const array = await getUserNotifications(token)
      console.log(array)
    } catch (errors) {
      console.log(errors)
    }
  }

  return (
    <>
      <h1>{user?.email}</h1>
      <h1>{token?.access_token}</h1>
      <h1>{user?.username}</h1>
      <h1>{user?.avatar}</h1>
      {user && token && <button onClick={() => { getNotifications(token?.access_token) }}>test</button>}
    </>
  );

}