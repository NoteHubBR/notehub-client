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

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserContextProvider = (props: any) => {

    const { userService: { refreshUser, getUserFollowing } } = useServices();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [state, setState] = useState({
        isFirstTime: false,
        isGuest: false,
        isSetted: false,
        token: null as string | null,
        user: null as User | null,
        following: [] as Partial<User>[]
    });

    const setUser = (token: string, user: User): void => {
        return setState(prev => ({ ...prev, token: token, user: user }))
    };

    const fetchUser = async (): Promise<{ access_token: string, user: User }> => {
        const { access_token, user } = await refreshUser();
        setUser(access_token, user);
        return { access_token, user };
    }

    const fetchFollowing = async (token: string, username: string): Promise<void> => {
        const { content } = await getUserFollowing(token, username);
        return setState(prev => ({ ...prev, following: content }));
    }

    useEffect(() => {
        if (!shouldUseUserContext(pathname)) return setIsLoaded(true);
        const stored = localStorage.getItem('isGuest');
        return setState(prev => ({
            ...prev,
            isFirstTime: stored === null,
            isGuest: stored === 'true',
            isSetted: true
        }));
    }, [])

    useEffect(() => {
        const init = async () => {
            const { isFirstTime, isGuest, isSetted } = state;
            if (!isSetted) return;
            if (isFirstTime || isGuest) setIsLoaded(true);
            if (shouldUseUserContext(pathname) && !isFirstTime && !isGuest) {
                const { access_token, user } = await fetchUser();
                await fetchFollowing(access_token, user.username);
                setIsLoaded(true);
            };
        }
        init();
    }, [state.isSetted])

    return (
        <UserContext.Provider value={{
            isFirstTime: state.isFirstTime,
            isGuest: state.isGuest,
            token: state.token,
            user: state.user,
            following: state.following,
            setIsFirstTime: (isFirstTime: boolean) => setState(prev => ({ ...prev, isFirstTime })),
            setIsGuest: (isGuest: boolean) => setState(prev => ({ ...prev, isGuest })),
            setUser
        }}>
            {props.children}
        </UserContext.Provider>
    )

};

export default UserContext;