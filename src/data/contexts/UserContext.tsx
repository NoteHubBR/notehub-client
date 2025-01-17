'use client';

import { createContext, useEffect, useState } from "react";
import { Store, storeData, User, shouldUseUserContext, LowDetailUser, LowDetailNote } from "@/core";
import { useLoading, useServices } from "../hooks";
import { usePathname } from "next/navigation";

export interface UserContextProps {
    store: Store;
    token: string | null;
    user: User | null;
    following: LowDetailUser[] | [];
    notes: LowDetailNote[] | [];
    setStore: (data: Partial<Store>) => void;
    setUser: (token: string, user: User) => void;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserContextProvider = (props: any) => {

    const { userService: { refreshUser, getUserFollowing, getUserNotes } } = useServices();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [state, setState] = useState({
        store: {} as Store,
        token: null as string | null,
        user: null as User | null,
        following: [] as LowDetailUser[],
        notes: [] as LowDetailNote[],
    });

    const setStore = (data: Partial<Store>): void => {
        const store: Store = {
            isFirstTimer: data.isFirstTimer ?? state.store?.isFirstTimer ?? false,
            isGuest: data.isGuest ?? state.store?.isGuest ?? false,
            isDarkModeUser: data.isDarkModeUser ?? state.store?.isDarkModeUser ?? false,
            isMenuOpen: data.isMenuOpen ?? state.store.isMenuOpen ?? false,
            searches: data.searches ?? state.store?.searches ?? []
        }
        localStorage.setItem('store', JSON.stringify(store));
        return setState(prev => ({ ...prev, store: store }));
    }

    const setUser = (token: string, user: User): void => {
        return setState(prev => ({ ...prev, token: token, user: user }))
    };

    const fetchUser = async (): Promise<void> => {
        const { access_token, user } = await refreshUser();
        return setUser(access_token, user);
    }

    const fetchUserData = async (token: string, username: string): Promise<void> => {
        const { content: following } = await getUserFollowing(token, username);
        const { content: notes } = await getUserNotes(token);
        return setState(prev => ({ ...prev, following: following, notes: notes }));
    }

    useEffect(() => {
        const init = async () => {
            storeData();
            const store: Store = JSON.parse(localStorage.getItem('store') ?? '{}');
            setState(prev => ({ ...prev, store: store }));
            const { isFirstTimer, isGuest } = store
            if (!shouldUseUserContext(pathname)) return setIsLoaded(true);
            if (isFirstTimer || isGuest) return setIsLoaded(true);
            if (shouldUseUserContext(pathname) && !isFirstTimer && !isGuest) return await fetchUser();
        }
        init();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const { token, user } = state;
            if (!token || !user) return
            await fetchUserData(token, user.username);
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

};

export default UserContext;