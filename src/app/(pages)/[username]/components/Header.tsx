'use client';

import { Desktop } from "./desktop";
import { LowDetailUser, User } from "@/core";
import { Mobile } from "./mobile";
import { NotFound } from "./NotFound";
import { useEffect, useRef, useState } from "react";
import { useHistory, useScreen, useServices, useUser } from "@/data/hooks";
import { useParams } from "next/navigation";

export const Header = () => {

    const { userService: { getUser, getUserDisplayNameHistory } } = useServices();

    const { onDesktop, onMobile } = useScreen();
    const { user: currentUser } = useUser();
    const { history: currentHistory } = useHistory();

    const params = useParams<{ username: string }>();

    const [notFound, setNotFound] = useState<boolean>(false);
    const [user, setUser] = useState<User | LowDetailUser | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    const isFetching = useRef<boolean>(false);
    useEffect(() => {
        const init = async () => {
            if (isFetching.current) return;
            if (currentUser && params.username === currentUser.username) {
                setUser(currentUser);
                setHistory(currentHistory);
                return;
            }
            isFetching.current = true;
            try {
                setUser(await getUser(params.username))
                setHistory(await getUserDisplayNameHistory(params.username));
                return;
            } catch {
                return setNotFound(true);
            } finally {
                return isFetching.current = false;
            }
        }
        init();
    }, [currentHistory, currentUser, getUser, getUserDisplayNameHistory, params.username])

    if (notFound) return <NotFound />;

    if (onDesktop && !user) return <Desktop.HeaderSkeleton />;

    if (onMobile && !user) return <Mobile.HeaderSkeleton />;

    if (onDesktop && user) return <Desktop.Header user={user} history={history} />;

    if (onMobile && user) return <Mobile.Header user={user} />;

}