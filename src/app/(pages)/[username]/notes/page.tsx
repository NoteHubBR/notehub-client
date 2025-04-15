'use client';

import { Element } from "./elements";
import { handleFieldErrorsMsg, isEmpty, LowDetailNote, Page as NotesPage } from "@/core";
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

        const q = sParams.get('q');
        const type = sParams.get('type');
        const tag = sParams.get('tag');
        const order = sParams.get('order');
        const sort = sParams.get('sort');
        const page = sParams.get('page');

        const params = {} as Record<string, string>;
        if (q) params.q = q;
        if (type) params.type = type;
        if (tag) params.tag = tag;
        if (order) params.order = order;
        if (sort) params.sort = sort;
        if (page) params.page = page;

        const newQuery = `?${new URLSearchParams(params)}`;
        if (newQuery !== window.location.search) router.replace(newQuery);

        let queryString = '';
        if (q) queryString += `q=${q}&`;
        if (type) queryString += `type=${type}&`;
        if (tag) queryString += `tag=${tag}&`;
        if (order) queryString += `sort=${order},${sort ?? 'desc'}&`;
        if (page) queryString += `page=${Number(page) - 1}&`;
        if (queryString.endsWith('&')) queryString = queryString.slice(0, -1);

        const init = async () => {
            if (isFetching.current || hasFetched && args === queryString) return;
            try {
                if (token) {
                    startFetch();
                    const { content, ...rest } = await searchUserNotes(token.access_token, username, queryString);
                    const tags = await findUserTags(token.access_token, username);
                    return setState((prev) => ({
                        ...prev,
                        args: queryString,
                        page: rest,
                        notes: content,
                        tags: tags,
                        emptyList: content.length === 0
                    }));
                }
            } catch (errors) {
                if (Array.isArray(errors)) {
                    const { notCurrent, notMutual } = handleFieldErrorsMsg(errors)
                    return setState((prev) => ({
                        ...prev,
                        args: queryString,
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
        <Section className="px-4 py-2">
            <Element.header />
            <Element.main />
            <Element.footer />
        </Section>
    )

    return (
        <Section className="px-4 py-2">
            <Element.Header tags={tags} />
            {onFetch
                ? <Element.Loading />
                : emptyList
                    ? <p className="p-4 text-center">Nada que seja público foi encontrado.</p>
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