'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Token, User, Cookies, shouldUseUserContext } from "@/core";
import { useFollowing, useLoading, useNotes, useServices, useStore } from "../hooks";
import { usePathname } from "next/navigation";

export interface UserContextProps {
    token: Token | null;
    user: User | null;
    setUser: (token: Token, user: User) => void;
    clearUser: () => void;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = (props: any) => {

    const {
        authService: { refreshUser },
        userService: { getUserFollowing },
        noteService: { getUserNotes }
    } = useServices();

    const { isStoreReady, store, setStore } = useStore();

    const { setFollowing } = useFollowing();

    const { setNotes } = useNotes();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [state, setState] = useState({
        token: null as Token | null,
        user: null as User | null,
    })

    const setUser = useCallback((token: Token | null, user: User | null): void => {
        return setState(prev => ({ ...prev, token: token, user: user }));
    }, [])

    const clearUser = useCallback(() => {
        setState((prev) => ({ ...prev, token: null, user: null }));
        setStore({ isGuest: true });
        return Cookies.remove('rtoken');
    }, [setStore])

    const fetchUser = async (): Promise<void> => {
        try {
            const { token, user } = await refreshUser();
            Cookies.set('rtoken', token.refresh_token, token.expires_at);
            return setUser(token, user);
        } catch {
            setStore({ isExpired: true });
            Cookies.remove('rtoken');
            return setUser(null, null);
        }
    }

    const fetchUserData = async (accessToken: string, username: string): Promise<void> => {
        try {
            setFollowing(await getUserFollowing(accessToken, username))
            setNotes(await getUserNotes(accessToken));
            return;
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        if (!isStoreReady) return;
        const init = async () => {
            if (shouldUseUserContext(pathname) && !store.isFirstTimer && !store.isGuest) {
                return await fetchUser();
            }
        }
        init();
    }, [isStoreReady])

    useEffect(() => {
        const fetchData = async () => {
            const { token, user } = state;
            if (!token || !user) return;
            await fetchUserData(token.access_token, user.username);
        }
        fetchData();
    }, [state.user])

    return (
        <UserContext.Provider value={{
            token: state.token,
            user: state.user,
            setUser,
            clearUser,
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;