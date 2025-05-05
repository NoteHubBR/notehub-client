import { Dialog } from "./dialog";
import { Element } from "./elements";
import { Icon } from "@/components/icons";
import { IconMoodPuzzled } from "@tabler/icons-react";
import { isEmpty, LowDetailNote, Page } from "@/core";
import { Skeleton } from "./skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServices, useUser } from "@/data/hooks";

export const Feed = () => {

    const { isMounted, token } = useUser();
    const { noteService: { getFeedNotes } } = useServices();

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

    const {
        Header: {
            Title,
            Filter
        },
        Item: {
            Article,
            Header: { Creator, Message, Time },
            Section: { Target, Desc, Flames }
        }
    } = Element;

    if (isEmpty(page)) return <Skeleton />;

    return (
        <section
            className="max-w-[777px] inlg:max-w-full w-full my-3 p-3 rounded-[5px]
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
        >
            <header className="p-3 pt-0 flex items-center justify-between">
                <Title>Feed</Title>
                <Filter />
            </header>
            {emptyFeed && <Dialog icon={IconMoodPuzzled} title="uai?" desc="Feed vazio." />}
            <ul className="flex flex-col gap-4">
                {notes.map((note) => (
                    <li key={note.id}>
                        <Article>
                            <header className="flex items-center gap-3">
                                <Creator user={note.user} />
                                <div className="flex flex-col">
                                    <Message user={note.user} />
                                    <Time time={note.created_at} />
                                </div>
                            </header>
                            <section className="p-3 rounded flex flex-col gap-2 dark:bg-semidark bg-semilight">
                                <Target note={note} />
                                <Desc>{note.description}</Desc>
                                <Flames note={note} />
                            </section>
                        </Article>
                    </li>
                ))}
            </ul>
            <Icon.Loading hidden={!onFetch} className="py-6" />
        </section>
    )

}