'use client';

import { useUser } from "@/data/hooks";

export default function Home() {

  const { user, token } = useUser();

  return (
    <>
      <h1>{user?.email}</h1>
      <h1>{token?.access_token}</h1>
    </>
  );

}