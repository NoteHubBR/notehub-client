'use client';

import { Desktop } from "./desktop";
import { LowDetailUser, User } from "@/core";
import { Mobile } from "./mobile";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useScreen, useServices, useUser } from "@/data/hooks";

export const Header = () => {

    const { userService: { getUser } } = useServices();

    const { onDesktop, onMobile } = useScreen();
    const { user: currentUser } = useUser();

    const params = useParams<{ username: string }>();

    const [user, setUser] = useState<User | LowDetailUser | null>(null);
    const isFetching = useRef<boolean>(false);
    useEffect(() => {
        const init = async () => {
            if (isFetching.current) return;
            if (currentUser && params.username === currentUser.username) {
                return setUser(currentUser);
            }
            isFetching.current = true;
            return setUser(await getUser(params.username))
        }
        init();
    }, [params.username])

    if (!user) return null;

    if (onDesktop) return <Desktop.Header user={user} />

    if (onMobile) return <Mobile.Header user={user} />;

}