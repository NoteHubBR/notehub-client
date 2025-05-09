'use client';

import { buildQueryStrings, isEmpty, LowDetailNote, LowDetailUser, Page as Pageable } from "@/core";
import { Device } from "@/components/devices";
import { Element } from "./elements";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";

const Page = () => {

    const sParams = useSearchParams();
    const query = buildQueryStrings(sParams);
    const [q, setQ] = useState<string>(sParams.get('q') ?? '');
    const type = sParams.get('type');

    const {
        userService: { searchUsers },
        noteService: { searchNotes, searchTags }
    } = useServices();

    const { isMounted } = useUser();

    const [state, setState] = useState({
        onFetch: false,
        page: {} as Omit<Pageable<(LowDetailUser | LowDetailNote)>, "content">,
        contents: [] as (LowDetailUser | LowDetailNote)[],
        emptyList: false
    })

    const { onFetch, page, contents, emptyList } = state;

    const isFetching = useRef<boolean>(false);

    const startFetch = useCallback(() => {
        isFetching.current = true;
        return setState((prev) => ({ ...prev, onFetch: true }));
    }, [])

    const endFetch = useCallback(() => {
        isFetching.current = false;
        return setState((prev) => ({ ...prev, onFetch: false, hasFetched: true }));
    }, [])

    const getPage = useCallback(async (query: string): Promise<Pageable<(LowDetailUser | LowDetailNote)>> => {
        if (type === "tags") return await searchTags(query);
        else if (type === "users") return await searchUsers(query);
        else if (type === "notes") return await searchNotes(query);
        else return await searchNotes(query);
    }, [searchNotes, searchTags, searchUsers, type])

    const init = useCallback(async () => {
        if (isFetching.current) return;
        try {
            startFetch();
            const { content, ...rest } = await getPage(query);
            return setState((prev) => ({
                ...prev,
                page: rest,
                contents: content,
                emptyList: content.length === 0,
            }))
        } catch (error) {
            throw error;
        } finally {
            endFetch();
        }
    }, [isMounted, sParams])

    useEffect(() => {
        if (isMounted) init()
    }, [init, isMounted])

    const { Header, Aside, Results, Loading } = Element;

    if (isEmpty(page)) return (
        <div className="w-full h-full py-4 px-4 inlg:px-2 inmd:p-0 flex flex-col gap-6 inmd:gap-0 dark:bg-dark bg-light">
            <Device.Mobile.Header.SearchHeader query={q} setQuery={setQ} disabled />
            <div className="w-full h-full flex flex-col">
                <Element.header />
                <div
                    className="max-w-[888px] w-full m-auto flex-1 flex justify-center gap-3
                    inlg:flex-col inlg:gap-0"
                >
                    <Element.aside />
                    <Element.results />
                </div>
            </div>
        </div>
    )

    return (
        <main className="w-full h-full py-4 px-4 inlg:px-2 inmd:p-0 flex flex-col gap-6 inmd:gap-0 dark:bg-dark bg-light">
            <Device.Mobile.Header.SearchHeader query={q} setQuery={setQ} />
            <section className="w-full h-full flex flex-col">
                <Header />
                <section
                    className="max-w-[888px] w-full m-auto flex-1 flex justify-center gap-3
                    inlg:flex-col inlg:gap-0"
                >
                    <Aside />
                    {onFetch
                        ?
                        <Loading />
                        :
                        <Results
                            page={page}
                            contents={contents}
                            isEmpty={emptyList}
                            totalElements={page.totalElements}
                        />
                    }
                </section>
            </section>
        </main >
    )

}

export default Page