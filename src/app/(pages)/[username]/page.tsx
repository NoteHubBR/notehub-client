'use client';

import { IconAt, IconBalloon, IconBubbleText, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { Overview } from "./components/overview";
import { Section } from "./components/Section";
import { toSpecificTime } from "@/core";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { user } = useUser();

    if (!user) return null;

    return (
        <Section>
            <header className="py-5 px-8 border-b dark:border-neutral-700/50 border-neutral-900/10">
                <h2 className="font-semibold text-xl">Visão Geral</h2>
            </header>
            <ul className="px-6 grid grid-cols-2 gap-x-6">
                <Overview.Info
                    href={`/${user.username}/followers`}
                    title={`Seguidores: ${user.followers_count}`}
                    subtitle="seguidores"
                    subtitleClassName="text-sm font-semibold"
                >
                    <IconUsersGroup size={28} />
                </Overview.Info>
                <Overview.Info
                    href={`/${user.username}/following`}
                    title={`Seguindo: ${user.following_count}`}
                    subtitle="seguindo"
                    subtitleClassName="text-sm font-semibold"
                >
                    <IconUsers size={28} />
                </Overview.Info>
                <Overview.Info
                    title="Entrou"
                    subtitle={`${toSpecificTime(user.created_at)}`}
                    subtitleClassName="text-sm"
                >
                    <IconBalloon size={28} />
                </Overview.Info>
                <Overview.Info
                    title="Usuário"
                    subtitle={`@${user.username}`}
                    subtitleClassName="text-sm"
                >
                    <IconAt size={28} />
                </Overview.Info>
                <Overview.Info
                    title="Mensagem"
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias pariatur quibusdam amet corrupti facere tempora consequatur ipsum, nulla quas aut, aliquam eum ratione ea voluptate nobis dolorum nihil velit distinctio."
                    subtitleClassName="text-md italic"
                >
                    <IconBubbleText size={28} />
                </Overview.Info>
            </ul>
        </Section >
    )

}

export default Page;