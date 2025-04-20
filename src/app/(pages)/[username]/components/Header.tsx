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

    const params = useParams<{ username: string }>();

    const { onDesktop, onMobile } = useScreen();
    const { isMounted, user: currentUser } = useUser();
    const { history: currentHistory } = useHistory();

    const [state, setState] = useState({
        notFound: false,
        user: {} as User | LowDetailUser,
        history: [] as string[]
    })

    const { notFound, user, history } = state;

    const isFetching = useRef<boolean>(false);

    useEffect(() => {
        const init = async () => {
            if (isFetching.current) return;
            if (currentUser && params.username === currentUser.username) {
                return setState((prev) => ({ ...prev, user: currentUser, history: currentHistory }));
            }
            isFetching.current = true;
            try {
                const user = await getUser(params.username);
                const history = await getUserDisplayNameHistory(params.username);
                return setState((prev) => ({ ...prev, user: user, history: history }));
            } catch {
                return setState((prev) => ({ ...prev, notFound: true }));
            } finally {
                return isFetching.current = false;
            }
        }
        if (isMounted) init();
    }, [currentHistory, currentUser, getUser, getUserDisplayNameHistory, isMounted, params.username])

    if (notFound) return <NotFound />;

    if (onDesktop && !user) return <Desktop.HeaderSkeleton />;

    if (onMobile && !user) return <Mobile.HeaderSkeleton />;

    if (onDesktop && user) return <Desktop.Header user={user} history={history} />;

    if (onMobile && user) return <Mobile.Header user={user} />;

}