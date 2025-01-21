'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Store, storeData, Token, User, Cookies, shouldUseUserContext, LowDetailUser, LowDetailNote } from "@/core";
import { useLoading, useServices } from "../hooks";
import { usePathname } from "next/navigation";

export interface UserContextProps {
    store: Store;
    token: Token | null;
    user: User | null;
    following: LowDetailUser[] | [];
    notes: LowDetailNote[] | [];
    setStore: (data: Partial<Store>) => void;
    setUser: (token: Token, user: User) => void;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserContextProvider = (props: any) => {

    const { userService: { refreshUser, getUserFollowing, getUserNotes } } = useServices();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [state, setState] = useState({
        store: {} as Store,
        token: null as Token | null,
        user: null as User | null,
        following: [] as LowDetailUser[],
        notes: [] as LowDetailNote[],
    })

    const setStore = useCallback((data: Partial<Store>): void => {
        const store: Store = {
            isFirstTimer: data.isFirstTimer ?? state.store?.isFirstTimer ?? false,
            isGuest: data.isGuest ?? state.store?.isGuest ?? false,
            isDarkModeUser: data.isDarkModeUser ?? state.store?.isDarkModeUser ?? false,
            isMenuOpen: data.isMenuOpen ?? state.store.isMenuOpen ?? false,
            searches: data.searches ?? state.store?.searches ?? []
        }
        localStorage.setItem('store', JSON.stringify(store));
        return setState(prev => ({ ...prev, store: store }));
    }, [state.store])

    const setUser = useCallback((token: Token | null, user: User | null): void => {
        return setState(prev => ({ ...prev, token: token, user: user }))
    }, [])

    const fetchUser = async (): Promise<void> => {
        try {
            const { token, user } = await refreshUser();
            Cookies.set('rtoken', token.refresh_token, token.expires_at);
            return setUser(token, user);
        } catch {
            Cookies.remove('rtoken');
            setUser(null, null);
            return setIsLoaded(true)
        }
    }

    const fetchUserData = async (accessToken: string, username: string): Promise<void> => {
        const { content: following } = await getUserFollowing(accessToken, username);
        const { content: notes } = await getUserNotes(accessToken);
        return setState(prev => ({ ...prev, following: following, notes: notes }));
    }

    useEffect(() => {
        const init = async () => {
            storeData();
            const store: Store = JSON.parse(localStorage.getItem('store') ?? '{}');
            setState(prev => ({ ...prev, store: store }));
            const { isFirstTimer, isGuest } = store
            if (shouldUseUserContext(pathname) && !isFirstTimer && !isGuest) {
                return await fetchUser();
            }
            else return setIsLoaded(true)
        }
        init();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const { token, user } = state;
            if (!token || !user) return
            await fetchUserData(token.access_token, user.username);
            setIsLoaded(true);
        }
        fetchData();
    }, [state.user])

    return (
        <UserContext.Provider value={{
            store: state.store,
            token: state.token,
            user: state.user,
            following: state.following,
            notes: state.notes,
            setStore,
            setUser
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;