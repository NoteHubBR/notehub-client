'use client';

import { createContext, useEffect, useState } from "react";
import { useLoading, useServices } from "../hooks";
import { usePathname } from "next/navigation";
import { User, Token, shouldUseUserContext } from "@/core";

export interface UserContextProps {
    isFirstTime: boolean;
    isGuest: boolean;
    user: User | null;
    token: Token | null;
    setIsFirstTime: (boolean: boolean) => void;
    setIsGuest: (boolean: boolean) => void;
    setUser: (user: User, token: Token,) => void;
};

const UserContext = createContext<UserContextProps>({} as any);

export const UserContextProvider = (props: any) => {

    const { setIsLoaded } = useLoading();

    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

    const [isGuest, setIsGuest] = useState<boolean>(false);

    const { userService: { refreshUser } } = useServices();

    const [user, setUserState] = useState<User | null>(null);

    const [token, setTokenSate] = useState<Token | null>(null);

    const setUser = (user: User, token: Token) => {
        setUserState(user);
        setTokenSate(token);
    };

    const fetchUser = async () => {
        const { user, ...token } = await refreshUser();
        setUser(user, token);
    }

    const pathname = usePathname();

    useEffect(() => {
        setIsFirstTime(() => { return localStorage.getItem('isGuest') === null });
        setIsGuest(() => { return localStorage.getItem('isGuest') === 'true' });
        if (isFirstTime || isGuest) setIsLoaded(true);
        if (shouldUseUserContext(pathname) && !isFirstTime && !isGuest) fetchUser();
    }, [isFirstTime, isGuest])

    return (
        <UserContext.Provider value={{ isFirstTime, isGuest, user, token, setIsFirstTime, setIsGuest, setUser }}>
            {props.children}
        </UserContext.Provider>
    )

};

export default UserContext;