'use client';

import { Desktop } from "./desktop";
import { Mobile } from "./mobile";
import { Template } from "@/components/templates";
import { useHistory, useScreen, useServices, useUser } from "@/data/hooks";
import { useParams } from "next/navigation";

export const Header = () => {

    const { userServiceQueries: { useGetUser, useGetUserDisplayNameHistory } } = useServices();

    const params = useParams<{ username: string }>();

    const { onDesktop, onMobile } = useScreen();
    const { isMounted, user: currentUser } = useUser();
    const { history: currentHistory } = useHistory();

    const shouldSkipHeader: boolean = params.username === "user";
    const shouldSkipFetch: boolean = currentUser ? currentUser.username === params.username : false;

    const { data: userData, isLoading: isUserLoading } = useGetUser(params.username, isMounted && !shouldSkipHeader && !shouldSkipFetch);
    const { data: historyData } = useGetUserDisplayNameHistory(params.username, isMounted && !shouldSkipHeader && !shouldSkipFetch);

    const user = currentUser ? currentUser : userData && userData.type === 'ok' ? userData.data : null;
    const history = currentHistory ? currentHistory : historyData && historyData.type === 'ok' ? historyData.data : null;

    if (shouldSkipHeader) return null;

    if (onDesktop && isUserLoading) return <Desktop.HeaderSkeleton />;

    if (onMobile && isUserLoading) return <Mobile.HeaderSkeleton />;

    if (userData && userData.type === 'notfound') return <Template.Forbidden />

    if (user && history) {
        if (onDesktop) return <Desktop.Header user={user} history={history} />;
        if (onMobile) return <Mobile.Header user={user} />;
    }

    return null;

}