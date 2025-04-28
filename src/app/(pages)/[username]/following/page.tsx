'use client';

import { buildQueryStrings, Page as UsersPage, handleFieldErrorsMsg, isEmpty, LowDetailUser } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconUsersGroup } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();

    const query = buildQueryStrings(sParams);

    const { userService: { searchUserFollowing } } = useServices();

    const { isMounted, token } = useUser();

    const [state, setState] = useState({
        onFetch: false,
        hasFetched: false,
        params: sParams.get('q'),
        page: {} as Omit<UsersPage<LowDetailUser>, 'content'>,
        users: [] as LowDetailUser[],
        emptyList: false,
        notCurrent: false,
        notMutual: false,
        notFound: false,
    })

    const { onFetch, hasFetched, params, page, users, emptyList, notCurrent, notMutual, notFound } = state;

    const isFetching = useRef<boolean>(false);

    const startFetch = useCallback(() => {
        isFetching.current = true;
        return setState((prev) => ({ ...prev, onFetch: true }));
    }, [])

    const endFetch = useCallback(() => {
        isFetching.current = false;
        return setState((prev) => ({ ...prev, onFetch: false, hasFetched: true }));
    }, [])

    const init = useCallback(async () => {
        const accessToken = token ? token.access_token : null;
        const secret = `${query}:${accessToken}`;
        if (isFetching.current || hasFetched && params === secret) return;
        try {
            startFetch();
            const { content, ...rest } = await searchUserFollowing(accessToken, username, query);
            return setState((prev) => ({
                ...prev,
                params: secret,
                page: rest,
                users: content,
                emptyList: content.length === 0,
                notCurrent: false,
                notMutual: false,
                notFound: false
            }))
        } catch (errors) {
            if (Array.isArray(errors)) {
                const { notCurrent, notMutual } = handleFieldErrorsMsg(errors);
                return setState((prev) => ({
                    ...prev,
                    params: secret,
                    notCurrent: notCurrent,
                    notMutual: notMutual
                }))
            } else return setState((prev) => ({ ...prev, params: secret, notFound: true }));
        } finally {
            endFetch();
        }
    }, [isMounted, sParams])

    useEffect(() => { if (isMounted) init() }, [init, isMounted]);

    if (notFound) return null;

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

    if (isEmpty(page) || isEmpty(users)) return (
        <Section className="p-4">
            <Element.header />
            <Element.main />
            <Element.footer />
        </Section>
    )

    return (
        <Section className="p-4 flex flex-col">
            <Element.Header />
            {onFetch
                ? <Element.Loading />
                : emptyList
                    ? <Element.Dialog
                        icon={IconUsersGroup}
                        title="Zero"
                        desc="Nenhum usuário."
                    />
                    :
                    <>
                        <Element.Main users={users} />
                        <Element.Footer page={page} isEmpty={emptyList} />
                    </>

            }
        </Section>
    )

}

export default Page;