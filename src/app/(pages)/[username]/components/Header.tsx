'use client';

import { Desktop } from "./desktop";
import { LowDetailUser, User } from "@/core";
import { Mobile } from "./mobile";
import { Template } from "@/components/templates";
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
        user: null as User | null as LowDetailUser,
        history: [] as string[]
    })

    const { notFound, user, history } = state;

    const shouldSkipHeader: boolean = params.username === "user";

    const isFetching = useRef<boolean>(false);

    useEffect(() => {
        const init = async () => {
            if (shouldSkipHeader || isFetching.current) return;
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
    }, [currentHistory, currentUser, getUser, getUserDisplayNameHistory, isMounted, params.username, shouldSkipHeader])

    if (shouldSkipHeader) return null;

    if (notFound) return <Template.Forbidden />;

    if (onDesktop && !user) return <Desktop.HeaderSkeleton />;

    if (onMobile && !user) return <Mobile.HeaderSkeleton />;

    if (onDesktop && user) return <Desktop.Header user={user} history={history} />;

    if (onMobile && user) return <Mobile.Header user={user} />;

}