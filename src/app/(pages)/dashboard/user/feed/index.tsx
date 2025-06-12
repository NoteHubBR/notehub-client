import { Empty } from "./empty";
import { Header } from "./header";
import { Icon } from "@/components/icons";
import { isEmpty, LowDetailNote, Page } from "@/core";
import { Item } from "./item";
import { Skeleton } from "./skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServices, useUser } from "@/data/hooks";

export const Feed = () => {

    const { noteService: { getFeedNotes } } = useServices();

    const { isMounted, token } = useUser();

    const [state, setState] = useState({
        onFetch: false,
        hasFetched: false,
        page: {} as Omit<Page<LowDetailNote>, 'content'>,
        notes: [] as LowDetailNote[],
        emptyFeed: false
    })

    const { onFetch, hasFetched, page, notes, emptyFeed } = state;

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
        if (isFetching.current || hasFetched || !token) return;
        try {
            startFetch();
            const { content, ...rest } = await getFeedNotes(token.access_token, 'page=0');
            return setState((prev) => ({
                ...prev,
                page: rest,
                notes: content,
                emptyFeed: content.length === 0
            }))
        } catch (error) {
            throw error;
        } finally {
            endFetch();
        }
    }, [endFetch, getFeedNotes, hasFetched, startFetch, token])

    const handleScroll = useCallback(async () => {
        if (!token || page.last || isFetching.current) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            try {
                startFetch()
                const { content, ...rest } = await getFeedNotes(token.access_token, `page=${page.page + 1}`);
                return setState((prev) => ({
                    ...prev,
                    page: rest,
                    notes: [...prev.notes, ...content]
                }))
            } finally {
                endFetch();
            }
        }
    }, [endFetch, getFeedNotes, page.last, page.page, startFetch, token]);

    useEffect(() => {
        if (isMounted) init();
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, [handleScroll, init, isMounted])

    if (isEmpty(page)) return <Skeleton />;

    if (emptyFeed) return <Empty />;

    return (
        <section
            className="max-w-[777px] inlg:max-w-full w-full my-3 p-3 rounded-[5px]
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
        >
            <Header />
            <ul className="flex flex-col gap-4">
                {notes.map((note) => (
                    <li key={note.id}>
                        <Item note={note} />
                    </li>
                ))}
            </ul>
            <Icon.Loading hidden={!onFetch} size={50} className="py-6" />
        </section>
    )

}