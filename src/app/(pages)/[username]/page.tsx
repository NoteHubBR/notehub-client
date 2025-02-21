'use client';

import { IconBook, IconFlame, IconNotebook } from "@tabler/icons-react";
import { Layout } from "./components/layout";
import { Section } from "./components/Section";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { user } = useUser();

    if (!user) return null;

    const username = user.username;

    return (
        <header className="w-full h-full p-8 dark:bg-neutral-900 bg-neutral-50">
            <Section>
                <Layout.Cover user={user} />
                <div className="pr-4 pl-36 flex items-center gap-6 justify-between rounded-b-md dark:bg-neutral-900 bg-neutral-50">
                    <Layout.Nav>
                        <Layout.Li href={`/${username}`}><IconBook />Visão Geral</Layout.Li>
                        <Layout.Li href={`/${username}`}><IconNotebook />Notas</Layout.Li>
                        <Layout.Li href={`/${username}`}><IconFlame fill="#7c3aed" color="#7c3aed" />Chamas</Layout.Li>
                    </Layout.Nav>
                    <Layout.Button isFollowing={false} />
                </div>
            </Section>
        </header>
    )

}

export default Page;