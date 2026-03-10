'use client';

import { IconAt, IconBalloon, IconBubbleText, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { Overview } from "./overview";
import { Section } from "./components/Section";
import { toSpecificTime } from "@/core";
import { useParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";

const Page = () => {

    const { userServiceQueries: { useGetUser } } = useServices();

    const params = useParams<{ username: string }>();

    const { isMounted, user: currentUser } = useUser();

    const shouldSkipHeader: boolean = params.username === "user";
    const shouldSkipFetch: boolean = currentUser ? currentUser.username === params.username : false;

    const { data: userData, isLoading } = useGetUser(params.username, isMounted && !shouldSkipHeader && !shouldSkipFetch);

    const user = shouldSkipFetch ? currentUser : userData && userData.type === 'ok' ? userData.data : null;

    if (isLoading) return <Overview.Skeleton />;

    if (userData && userData.type === 'notfound') return null;

    if (user) return (
        <Section>
            <header className="py-5 px-8 border-b dark:border-neutral-700/50 border-dark/10">
                <h2 className="font-semibold text-xl inmd:text-center">Visão Geral</h2>
            </header>
            <ul className="px-6 insm:px-0 grid grid-cols-2 insm:grid-cols-1 gap-x-6">
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
                    subtitle={`${user.message ?? ''}`}
                    subtitleClassName="text-md italic"
                >
                    <IconBubbleText size={28} />
                </Overview.Info>
            </ul>
        </Section>
    )

    return null;

}

export default Page;