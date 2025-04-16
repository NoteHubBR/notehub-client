'use client';

import { buildQueryStrings, handleFieldErrorsMsg, isEmpty, LowDetailNote, Page as NotesPage } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const router = useRouter();

    const { noteService: { findUserTags, searchUserNotes } } = useServices();

    const { token } = useUser();

    const [state, setState] = useState({
        onFetch: false,
        hasFetched: false,
        args: sParams.get('q'),
        page: {} as Omit<NotesPage<LowDetailNote>, 'content'>,
        notes: [] as LowDetailNote[],
        tags: [] as string[],
        emptyList: false,
        notCurrent: false,
        notMutual: false,
    })

    const { onFetch, hasFetched, args, page, notes, tags, emptyList, notCurrent, notMutual } = state;

    const isFetching = useRef<boolean>(false);

    const startFetch = useCallback(() => {
        isFetching.current = true;
        return setState((prev) => ({ ...prev, onFetch: true }));
    }, [])

    const endFetch = useCallback(() => {
        isFetching.current = false;
        return setState((prev) => ({ ...prev, onFetch: false, hasFetched: true }));
    }, [])

    useEffect(() => {
        const init = async () => {
            const query = buildQueryStrings(sParams, router);
            if (isFetching.current || hasFetched && args === query) return;
            try {
                if (token) {
                    startFetch();
                    const { content, ...rest } = await searchUserNotes(token.access_token, username, query);
                    const userTags = tags.length > 0
                        ? tags
                        : await findUserTags(token.access_token, username)
                    return setState((prev) => ({
                        ...prev,
                        args: query,
                        page: rest,
                        notes: content,
                        tags: userTags,
                        emptyList: content.length === 0
                    }));
                }
            } catch (errors) {
                if (Array.isArray(errors)) {
                    const { notCurrent, notMutual } = handleFieldErrorsMsg(errors);
                    return setState((prev) => ({
                        ...prev,
                        args: query,
                        notCurrent: notCurrent,
                        notMutual: notMutual
                    }))
                }
            } finally {
                endFetch();
            }
        }
        init();

    }, [sParams, state, token])

    if (notCurrent) return (
        <Section className="p-6 flex items-center inmd:justify-center gap-3">
            <Element.Dialog
                icon={IconEyeOff}
                title="Notas ocultas"
                desc="Nome auto explicativo."
            />
        </Section>
    )

    if (notMutual) return (
        <Section className="p-6 flex items-center inmd:justify-center gap-3">
            <Element.Dialog
                icon={IconLock}
                title="Perfil privado"
                desc="Necessária conexão bidirecional, ambos se seguirem."
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
        <Section className="p-4">
            <Element.Header tags={tags} />
            {onFetch
                ? <Element.Loading />
                : emptyList
                    ? <h2 className="pt-4 font-medium text-center dark:text-lighter/75 text-darker/75">Nada foi encontrado.</h2>
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