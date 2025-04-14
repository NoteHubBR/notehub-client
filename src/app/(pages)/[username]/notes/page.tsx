'use client';

import { Element } from "./elements";
import { isEmpty, LowDetailNote, Page as NotesPage } from "@/core";
import { Section } from "../components/Section";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const router = useRouter();

    const { noteService: { findUserTags, searchUserNotes } } = useServices();
    const { token } = useUser();

    const [state, setState] = useState({
        page: {} as Omit<NotesPage<LowDetailNote>, 'content'>,
        notes: [] as LowDetailNote[],
        tags: [] as string[],
        emptyList: false,
        notMutual: false,
    })

    const { page, notes, tags, emptyList, notMutual } = state;

    const isFetching = useRef<boolean>(false);

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
            if (!token || isFetching.current) return;
            isFetching.current = true;
            try {
                const { content, ...rest } = await searchUserNotes(token.access_token, username, queryString);
                const tags = await findUserTags(token.access_token, username);
                return setState((prev) => ({
                    page: rest,
                    notes: content,
                    tags: tags,
                    notMutual: prev.notMutual,
                    emptyList: content.length === 0
                }));
            } catch(error) {
                console.log(error)
                return setState((prev) => ({
                    ...prev,
                    notMutual: true
                }))
            } finally {
                return isFetching.current = false;
            }
        }
        init();

    }, [token, sParams])

    if (notMutual) return (
        <Section className="px-4 py-2">
            <p>Faz o L</p>
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
            <Element.Header page={page} tags={tags} />
            <Element.Main notes={notes} />
            <Element.Footer page={page} isEmpty={emptyList} />
        </Section>
    )

}

export default Page;