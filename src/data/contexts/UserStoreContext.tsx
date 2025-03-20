'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Store, storeData, User } from "@/core";

export interface UserStoreProps {
    store: Store;
    setStore: (data: Partial<Store>, username?: string) => void;
    setActions: (data: Partial<{ isMenuOpen: boolean, searches: string[] }>, username?: string) => void;
    updateActions: (oldUsername: string, newUsername: string) => void;
    isMenuOpen: (user: User | null) => boolean;
    searches: (user: User | null) => string[];
    isStoreReady: boolean;
}

const UserStoreContext = createContext<UserStoreProps>({} as any);

export const UserStoreProvider = (props: any) => {

    const [store, setStore] = useState({} as Store);

    const [isReady, setIsReady] = useState<boolean>(false);

    const setter = useCallback((data: Partial<Store>, username?: string): void => {
        const stored: Store = JSON.parse(localStorage.getItem('store') ?? '{}') as Store;
        const index = username ?? 'Guest';
        const updated: Store = {
            ...stored,
            ...data,
            actions: {
                ...stored.actions,
                [index]: {
                    ...(stored.actions[index] || { isMenuOpen: false, searches: [] }),
                    ...data.actions?.[index]
                }
            }
        }
        localStorage.setItem('store', JSON.stringify(updated));
        return setStore(updated);
    }, [])

    const setActions = useCallback((data: Partial<{ isMenuOpen: boolean, searches: string[] }>, username?: string): void => {
        return setter({
            actions: {
                [username ?? 'Guest']: {
                    ...store.actions[username ?? 'Guest'],
                    ...data
                }
            }
        }, username)
    }, [store.actions, setter])

    const updateActions = useCallback((oldUsername: string, newUsername: string) => {
        return setStore((prev) => {
            const { [oldUsername]: oldActions, ...restActions } = prev.actions;
            const newActions = {
                ...restActions,
                [newUsername]: oldActions
            }
            const updatedStore = {
                ...prev,
                actions: newActions
            }
            localStorage.setItem('store', JSON.stringify(updatedStore));
            return updatedStore
        })
    }, [])

    const isMenuOpen = (user: User | null): boolean => {
        return user ? store.actions[user.username].isMenuOpen : false;
    }

    const searches = (user: User | null): string[] => {
        return user ? store.actions[user.username].searches : store.actions['Guest'].searches;
    }

    useEffect(() => {
        storeData();
        const store: Store = JSON.parse(localStorage.getItem('store') ?? '{}') as Store;
        setStore(store);
        setIsReady(true);
    }, [])

    return (
        <UserStoreContext.Provider value={{
            store,
            setStore: setter,
            setActions,
            updateActions,
            isMenuOpen,
            searches,
            isStoreReady: isReady
        }}
        >
            {props.children}
        </UserStoreContext.Provider>
    )

}

export default UserStoreContext;