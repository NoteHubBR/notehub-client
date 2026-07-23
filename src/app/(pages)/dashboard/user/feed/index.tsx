import { Empty } from "./empty";
import { FeedEvent } from "@/core";
import { Header } from "./header";
import { Icon } from "@/components/icons";
import { Item } from "./item";
import { Skeleton } from "./skeleton";
import { useApi, useStore, useUser } from "@/data/hooks";
import { useEffect, useCallback } from "react";

export const Feed = () => {

    const { feedQueries: { useGetFeed } } = useApi();
    const { isMounted, user, token } = useUser();
    const { filters } = useStore();

    const accessToken = token ? token.access_token : 'token';
    const events = filters(user).map(f => `events=${f}`).join('&');

    const {
        data: data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useGetFeed(accessToken, events, isMounted)

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

    if (!user) return;

    if (isLoading) return <Skeleton />;

    if (data) {
        const events: FeedEvent[] = data.pages.flatMap(p => p.content) ?? [];
        if (events.length === 0) return <Empty />;
        return (
            <section
                className="max-w-[777px] inlg:max-w-full w-full my-3 p-3 rounded-[5px]
                border dark:border-light/10 border-dark/10
                dark:bg-darker bg-lighter"
            >
                <Header />
                <ul className="flex flex-col gap-4">
                    {events.map((event, key) => (
                        <li key={key}>
                            <Item user={user} event={event} />
                        </li>
                    ))}
                </ul>
                <Icon.Loading hidden={!isFetchingNextPage} size={50} className="py-6" />
            </section>
        )
    }

    return null;

}