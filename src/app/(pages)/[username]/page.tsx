'use client';

import { IconBook } from "@tabler/icons-react";
import { Photo } from "@/components/Photo";
import { useUser } from "@/data/hooks";
import Image from "next/image";
import Link from "next/link";

const Page = () => {

    const { user } = useUser();

    if (!user) return null;

    const username = user.username;

    return (
        <main className="w-full h-full p-8 dark:bg-neutral-900 bg-neutral-50">
            <section
                style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,.25))' }}
                className="max-w-[999px] w-full m-auto
                    dark:border dark:border-neutral-700/50 dark:border-t-transparent"
            >
                <figure className="relative w-full h-full">
                    <Image
                        src={'https://pbs.twimg.com/profile_banners/1111976778065723393/1691774508/1500x500'}
                        alt="cover" width={999} height={0}
                        className="rounded-t-md"
                    />
                    <Photo user={user} size={111} className="absolute left-4 bottom-0 translate-y-1/2" />
                    <h1 className="absolute left-36 bottom-2
                            py-1 px-2 rounded-md
                            font-semibold text-xl text-white
                            backdrop-blur-md
                            bg-neutral-900/20"
                    >
                        {user.display_name}
                    </h1>
                    {/* <button>Seguir</button> */}
                </figure>
                <nav className="p-4 pl-36 rounded-b-md dark:bg-neutral-900 bg-neutral-50">
                    <ul className="flex items-center gap-6">
                        <Link
                            href={`/${username}`}
                            className="relative
                                py-1 px-2 rounded-md flex items-center gap-1
                                hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10
                                after:pointer-events-none after:absolute after:w-full after:left-0 after:-bottom-[55%] after:border after:border-violet-600
                                transition-colors"
                        >
                            <IconBook size={20} /> Overview
                        </Link>
                        <Link href={`/${username}/notes`} className="flex items-center gap-1">
                            Notas
                        </Link>
                        <Link href={`/${username}/flames`} className="flex items-center gap-1">
                            Chamas
                        </Link>
                    </ul>
                </nav>
            </section>
        </main>
    )

}

export default Page;