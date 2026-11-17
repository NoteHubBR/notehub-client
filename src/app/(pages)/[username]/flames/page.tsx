'use client';

import { buildQueryStrings, FLAMES_QUERY, handleFieldErrorsMsg, queryLocal } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconNotesOff } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useApi, useFlames, useLoading, useUser } from "@/data/hooks";
import { useMemo } from 'react';
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const search = sParams.toString();

    const { flameQueries: { useSearchUserFlames } } = useApi();

    const { isMounted, token, user } = useUser();
    const { flames: currentFlames } = useFlames();
    const { isLoaded } = useLoading();

    const isCurrentUser = user ? user.username === username : false;

    const { data: remoteResponse, isLoading: remoteLoading, isFetching: remoteFetching } = useSearchUserFlames(
        token ? token.access_token : null,
        username,
        buildQueryStrings(sParams, 'createdAt'),
        isMounted && !isCurrentUser,
    )

    const localFlames = useMemo(() => {
        if (!isCurrentUser) return null;
        return queryLocal(FLAMES_QUERY, currentFlames, new URLSearchParams(search));
    }, [isCurrentUser, currentFlames, search])

    const response = isCurrentUser
        ? localFlames ? { type: 'ok' as const, data: localFlames } : null
        : remoteResponse;
    const isLoading = isCurrentUser ? !isLoaded : remoteLoading;
    const isFetching = isCurrentUser ? false : remoteFetching;

    if (isLoading) return (
        <Section className="p-4">
            <Element.header />
            <Element.main />
            <Element.footer />
        </Section>
    )

    if (response) {
        if (response.type === 'notfound') return null;
        if (response.type === 'forbidden') {
            const { notCurrent, notMutual } = handleFieldErrorsMsg(response.data);
            if (notCurrent) return (
                <Section className="p-6 flex">
                    <Element.Dialog
                        icon={IconEyeOff}
                        title="Notas ocultas"
                        desc="Nome auto explicativo."
                    />
                </Section>
            )
            if (notMutual) return (
                <Section className="p-6 flex">
                    <Element.Dialog
                        icon={IconLock}
                        title="Perfil privado"
                        desc="Necessário que ambos de vocês se sigam."
                    />
                </Section>
            )
        }
        if (response.type === 'ok') {
            const { content: flames, ...page } = response.data;
            const emptyList = flames.length === 0;
            return (
                <Section className="p-4 flex flex-col">
                    <Element.Header />
                    {isFetching
                        ? <Element.Loading />
                        : emptyList
                            ? <Element.Dialog
                                icon={IconNotesOff}
                                title="Zero"
                                desc="Nada encontrado."
                            />
                            :
                            <>
                                <Element.Main flames={flames} />
                                <Element.Footer page={page} isEmpty={emptyList} />
                            </>

                    }
                </Section>
            )
        }
        return null;
    }

    return null;

}

export default Page;