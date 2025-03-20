'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Token, User, Cookies, shouldUseUserContext } from "@/core";
import { useFollowing, useHistory, useLoading, useNotes, useServices, useStore } from "../hooks";
import { usePathname } from "next/navigation";

export interface UserContextProps {
    token: Token | null;
    user: User | null;
    setUser: (token: Token, user: User) => void;
    updateUser: (user: Partial<User>) => void;
    clearUser: () => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = (props: any) => {

    const {
        authService: { refreshUser, logoutUser },
        userService: { getUserDisplayNameHistory, getUserFollowing },
        noteService: { getUserNotes }
    } = useServices();

    const { isStoreReady, store, setStore, setActions, updateActions } = useStore();
    const { clearHistory, setHistory } = useHistory();
    const { clearFollowing, setFollowing } = useFollowing();
    const { clearNotes, setNotes } = useNotes();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [state, setState] = useState({
        token: null as Token | null,
        user: null as User | null,
    })

    const setUser = useCallback((token: Token | null, user: User | null): void => {
        const username = user?.username ?? 'Guest';
        setActions({
            isMenuOpen: store.actions[username]?.isMenuOpen ?? false,
            searches: store.actions[username]?.searches ?? []
        }, username)
        return setState(prev => ({ ...prev, token: token, user: user }));
    }, [store.actions, setActions])

    const updateUser = useCallback((user: Partial<User>) => {
        if (!user.username) return;
        updateActions(state.user!.username, user.username);
        return setState((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                ...user
            } as User
        }))
    }, [state.user, updateActions])

    const clearUser = useCallback(async () => {
        if (state.token) await logoutUser(state.token.access_token);
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

    const clearData = useCallback(async () => {
        clearHistory();
        clearFollowing();
        clearNotes();
    }, [clearHistory, clearFollowing, clearNotes])

    const fetchUserData = async (accessToken: string, username: string): Promise<void> => {
        try {
            await clearData();
            setHistory(await getUserDisplayNameHistory(username));
            setFollowing(await getUserFollowing(accessToken, username));
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
            updateUser,
            setUser,
            clearUser,
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;