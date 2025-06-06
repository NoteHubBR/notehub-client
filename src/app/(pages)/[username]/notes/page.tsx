'use client';

import { buildQueryStrings, handleFieldErrorsMsg, isEmpty, LowDetailNote, Page as NotesPage } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconNotesOff } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useServices, useTags, useUser } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();

    const query = buildQueryStrings(sParams);

    const { noteService: { findUserTags, searchUserNotes } } = useServices();

    const { isMounted, token, user } = useUser();
    const { tags: currentTags } = useTags();

    const [state, setState] = useState({
        onFetch: false,
        hasFetched: false,
        args: sParams.get('q'),
        page: {} as Omit<NotesPage<LowDetailNote>, 'content'>,
        notes: [] as LowDetailNote[],
        tags: currentTags,
        emptyList: false,
        notCurrent: false,
        notMutual: false,
        notFound: false,
    })

    const { onFetch, hasFetched, args, page, notes, tags, emptyList, notCurrent, notMutual, notFound } = state;

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
        if (isFetching.current || hasFetched && args === secret) return;
        try {
            startFetch();
            const isCurrentUser = user ? user.username === username : false;
            const { content, ...rest } = await searchUserNotes(accessToken, username, query);
            const userTags = tags.length > 0 && isCurrentUser
                ? currentTags
                : await findUserTags(accessToken, username);
            return setState((prev) => ({
                ...prev,
                args: secret,
                page: rest,
                notes: content,
                tags: userTags,
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
                    args: query,
                    notCurrent: notCurrent,
                    notMutual: notMutual
                }))
            } else return setState((prev) => ({ ...prev, notFound: true }));
        } finally {
            endFetch();
        }
    }, [isMounted, sParams])

    useEffect(() => {
        if (isMounted) init();
    }, [init, isMounted])

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

    if (isEmpty(page) || isEmpty(notes)) return (
        <Section className="p-4">
            <Element.header />
            <Element.main />
            <Element.footer />
        </Section>
    )

    return (
        <Section className="p-4 flex flex-col">
            <Element.Header tags={tags} />
            {onFetch
                ? <Element.Loading />
                : emptyList
                    ? <Element.Dialog
                        icon={IconNotesOff}
                        title="Zero"
                        desc="Nada encontrado."
                    />
                    :
                    <>
                        <Element.Main notes={notes} />
                        <Element.Footer page={page} isEmpty={emptyList} />
                    </>
            }
        </Section>
    )

}

export default Page;