'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Token, User, Cookies, shouldUseUserContext } from "@/core";
import { useFlames, useFollowing, useHistory, useLoading, useNotes, useServices, useStore, useTags } from "../hooks";
import { usePathname } from "next/navigation";

export interface UserContextProps {
    isMounted: boolean;
    token: Token | null;
    user: User | null;
    setUser: (token: Token, user: User) => void;
    updateToken: (token: Token) => void;
    updateUser: (user: Partial<User>) => void;
    clearUser: (options?: { skipLogout?: boolean }) => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = (props: any) => {

    const {
        authService: { refreshUser, logoutUser },
        userService: { getUserDisplayNameHistory, searchUserFollowing },
        noteService: { getUserNotes, findUserTags },
        flameService: { getUserFlames }
    } = useServices();

    const { isStoreReady, store, setStore, setActions, updateActions } = useStore();
    const { clearHistory, setHistory } = useHistory();
    const { clearFollowing, setFollowing } = useFollowing();
    const { clearNotes, setNotes } = useNotes();
    const { clearFlames, setFlames } = useFlames();
    const { clearTags, setTags } = useTags();

    const pathname = usePathname();

    const { setIsLoaded } = useLoading();

    const [state, setState] = useState({
        isMounted: false,
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

    const updateToken = useCallback((token: Token) => {
        return setState((prev) => ({
            ...prev,
            token: token
        }))
    }, [])

    const updateUser = useCallback((user: Partial<User>) => {
        if (state.user) {
            const { avatar, banner, profile_private, username, display_name, message } = user;
            if (username) updateActions(state.user.username, username);
            return setState((prev) => {
                if (prev.user) return ({
                    ...prev,
                    user: {
                        ...prev.user,
                        avatar: avatar !== undefined ? avatar : prev.user.avatar,
                        banner: banner !== undefined ? banner : prev.user.banner,
                        profile_private: profile_private ?? prev.user.profile_private,
                        username: username ?? prev.user.username,
                        display_name: display_name ?? prev.user.display_name,
                        message: message ?? prev.user.message
                    } as User
                })
                return prev;
            })
        }
    }, [state.user, updateActions])

    const clearUser = useCallback(async ({ skipLogout }: { skipLogout?: boolean } = {}) => {
        if (!skipLogout) await logoutUser();
        setState((prev) => ({ ...prev, token: null, user: null }));
        setStore({ isGuest: true });
        return Cookies.remove('rtoken');
    }, [logoutUser, setStore])

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
        clearFlames();
        clearTags();
    }, [clearFlames, clearFollowing, clearHistory, clearNotes, clearTags])

    const fetchUserData = async (accessToken: string, username: string): Promise<void> => {
        try {
            await clearData();
            setHistory(await getUserDisplayNameHistory(username));
            setFollowing(await searchUserFollowing(accessToken, username, 'sort=username,asc&size=9999'));
            setNotes(await getUserNotes(accessToken));
            setFlames(await getUserFlames(accessToken, username, 'size=9999'));
            setTags(await findUserTags(accessToken, username));
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
        init().finally(() => setState((prev) => ({ ...prev, isMounted: true })));
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
            isMounted: state.isMounted,
            token: state.token,
            user: state.user,
            updateToken,
            updateUser,
            setUser,
            clearUser,
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;