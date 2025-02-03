'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Store, storeData, Token, User, Cookies, shouldUseUserContext, LowDetailUser, LowDetailNote, Notification, Page } from "@/core";
import { useLoading, useServices } from "../hooks";
import { usePathname } from "next/navigation";

export interface UserContextProps {
    store: Store;
    token: Token | null;
    user: User | null;
    notificationsCount: number;
    notificationsPage: Omit<Page<Notification>, 'content'>;
    notifications: Notification[] | [];
    following: LowDetailUser[] | [];
    notes: LowDetailNote[] | [];
    setStore: (data: Partial<Store>) => void;
    setUser: (token: Token, user: User) => void;
    clearUser: () => void;
    setNotifications: (page: Page<Notification>) => void;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserContextProvider = (props: any) => {

    const {
        authService: { refreshUser },
        userService: { getUserFollowing },
        noteService: { getUserNotes }
    } = useServices();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [state, setState] = useState({
        store: {} as Store,
        token: null as Token | null,
        user: null as User | null,
        notificationsCount: 0 as number,
        notificationsPage: {} as Omit<Page<Notification>, 'content'>,
        notifications: [] as Notification[],
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
        return setState(prev => ({ ...prev, token: token, user: user }));
    }, [])

    const clearUser = useCallback(() => {
        setState((prev) => ({ ...prev, token: null, user: null, notificationsCount: 0 }));
        setStore({ isGuest: true });
        return Cookies.remove('rtoken');
    }, [setStore])

    const setNotifications = useCallback((page: Page<Notification>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            ...prev,
            notificationsPage: rest,
            notifications: [...prev.notifications, ...content],
            notificationsCount: [...prev.notifications, ...content].filter(n => !n.read).length
        }))
    }, [])

    const fetchUser = async (): Promise<void> => {
        try {
            const { token, user } = await refreshUser();
            Cookies.set('rtoken', token.refresh_token, token.expires_at);
            return setUser(token, user);
        } catch {
            Cookies.remove('rtoken');
            return setUser(null, null);
        }
    }

    const setTitle = useCallback((notificationsPage: number): string => {
        setState((prev) => ({ ...prev, notificationsCount: notificationsPage }));
        const title = `${notificationsPage > 0 ? `(${notificationsPage}) XYZ` : 'XYZ'}`;
        return document.title = title;
    }, [])

    const fetchUserData = async (accessToken: string, username: string): Promise<void> => {
        try {
            const { content: following } = await getUserFollowing(accessToken, username);
            const { content: notes } = await getUserNotes(accessToken);
            return setState(prev => ({ ...prev, following: following, notes: notes }));
        } finally {
            setIsLoaded(true);
        }
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
        }
        init();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const { token, user } = state;
            if (!token || !user) return;
            await fetchUserData(token.access_token, user.username);
            setTitle(user.notifications);
        }
        fetchData();
    }, [state.user])

    useEffect(() => {
        setTitle(state.notificationsCount);
    }, [setTitle, state.notificationsCount])

    return (
        <UserContext.Provider value={{
            store: state.store,
            token: state.token,
            user: state.user,
            notificationsPage: state.notificationsPage,
            notificationsCount: state.notificationsCount,
            notifications: state.notifications,
            following: state.following,
            notes: state.notes,
            setStore,
            setUser,
            clearUser,
            setNotifications
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;