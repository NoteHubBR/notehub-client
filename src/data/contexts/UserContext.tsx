'use client';

import { createContext, useEffect, useState } from "react";
import { useLoading, useServices } from "../hooks";
import { usePathname } from "next/navigation";
import { User, shouldUseUserContext } from "@/core";

export interface UserContextProps {
    isFirstTime: boolean;
    isGuest: boolean;
    token: string | null;
    user: User | null;
    following: Partial<User>[] | [];
    setIsFirstTime: (boolean: boolean) => void;
    setIsGuest: (boolean: boolean) => void;
    setUser: (token: string, user: User) => void;
};

const UserContext = createContext<UserContextProps>({} as any);

export const UserContextProvider = (props: any) => {

    const { userService: { refreshUser, getUserFollowing } } = useServices();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const [isSetted, setIsSetted] = useState<boolean>(false);
    const [token, setTokenSate] = useState<string | null>(null);
    const [user, setUserState] = useState<User | null>(null);
    const [following, setFollowing] = useState<Partial<User>[]>([]);

    const setUser = (token: string, user: User,) => {
        setTokenSate(token);
        setUserState(user);
    };

    const fetchUser = async (): Promise<{ access_token: string, user: User }> => {
        const { access_token, user } = await refreshUser();
        setUser(access_token, user);
        return { access_token, user };
    }

    const fetchFollowing = async (token: string, username: string) => {
        const { content } = await getUserFollowing(token, username);
        return setFollowing(content);
    }

    useEffect(() => {
        if (!shouldUseUserContext(pathname)) setIsLoaded(true);
        setIsFirstTime(() => { return localStorage.getItem('isGuest') === null });
        setIsGuest(() => { return localStorage.getItem('isGuest') === 'true' });
        setIsSetted(() => { return true });
    }, [])

    useEffect(() => {
        const init = async () => {
            if (isSetted) {
                if (isFirstTime || isGuest) setIsLoaded(true);
                if (shouldUseUserContext(pathname) && !isFirstTime && !isGuest) {
                    const { access_token, user } = await fetchUser();
                    fetchFollowing(access_token, user.username);
                    setIsLoaded(true);
                };
            }
        }
        init();
    }, [isSetted])

    return (
        <UserContext.Provider value={{ isFirstTime, isGuest, token, user, following, setIsFirstTime, setIsGuest, setUser }}>
            {props.children}
        </UserContext.Provider>
    )

};

export default UserContext;