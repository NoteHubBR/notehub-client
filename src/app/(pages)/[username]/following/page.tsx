'use client';

import { buildQueryStrings, FOLLOWING_QUERY, handleFieldErrorsMsg, queryLocal } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconUsersGroup } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useApi, useFollowing, useLoading, useUser } from "@/data/hooks";
import { useMemo } from 'react';
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const search = sParams.toString();

    const { userQueries: { useSearchUserFollowing } } = useApi();
    const { isMounted, token, user } = useUser();
    const { users: currentFollowing } = useFollowing();
    const { isLoaded } = useLoading();


    const isCurrentUser = user ? user.username === username : false;

    const { data: remoteResponse, isLoading: remoteLoading, isFetching: remoteFetching } = useSearchUserFollowing(
        token ? token.access_token : null,
        username,
        buildQueryStrings(sParams),
        isMounted && !isCurrentUser,
    )

    const localFollowing = useMemo(() => {
        if (!isCurrentUser) return null;
        return queryLocal(FOLLOWING_QUERY, currentFollowing, new URLSearchParams(search));
    }, [isCurrentUser, currentFollowing, search])

    const response = isCurrentUser
        ? localFollowing ? { type: 'ok' as const, data: localFollowing } : null
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
            return null;
        }
        if (response.type === 'ok') {
            const { content, ...page } = response.data;
            const emptyList = content.length === 0;
            return (
                <Section className="p-4 flex flex-col">
                    <Element.Header />
                    {isFetching
                        ? <Element.Loading />
                        : emptyList
                            ? <Element.Dialog
                                icon={IconUsersGroup}
                                title="Zero"
                                desc="Nenhum usuário."
                            />
                            :
                            <>
                                <Element.Main users={content} />
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