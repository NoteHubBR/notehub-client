import { Empty } from "./empty";
import { Header } from "./header";
import { Icon } from "@/components/icons";
import { Item } from "./item";
import { LowDetailNote } from "@/core";
import { Skeleton } from "./skeleton";
import { useEffect, useCallback } from "react";
import { useServices, useUser } from "@/data/hooks";

export const Feed = () => {

    const { noteServiceQueries: { useGetFeed } } = useServices();
    const { isMounted, token } = useUser();

    const accessToken = token ? token.access_token : 'token';

    const {
        data: data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useGetFeed(accessToken, isMounted)

    const handleScroll = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage) return;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        if (scrollY + windowHeight >= docHeight - 1) fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    if (isLoading) return <Skeleton />;

    if (data) {
        const notes: LowDetailNote[] = data.pages.flatMap(p => p.content) ?? [];
        if (notes.length === 0) return <Empty />;
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
                <Icon.Loading hidden={!isFetchingNextPage} size={50} className="py-6" />
            </section>
        )
    }

    return null;

}