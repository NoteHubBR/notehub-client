'use client';

import { Actions, defaultAction, Event, Store, storeData, User } from "@/core";
import { createContext, useCallback, useEffect, useState } from "react";

export interface UserStoreProps {
    store: Store;
    setStore: (data: Partial<Store>, username?: string) => void;
    setActions: (data: Partial<Actions>, username?: string) => void;
    updateActions: (oldUsername: string, newUsername: string) => void;
    isMenuOpen: (user: User | null) => boolean;
    searches: (user: User | null) => string[];
    filters: (user: User | null) => Event[];
    isStoreReady: boolean;
}

const UserStoreContext = createContext<UserStoreProps>({} as UserStoreProps);

export const UserStoreProvider = ({ children }: { children: React.ReactNode }) => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [store, setStore] = useState<Store>({} as Store);

    const setter = useCallback((data: Partial<Store>, username?: string): void => {
        const stored: Store = JSON.parse(localStorage.getItem('store') ?? '{}') as Store;
        const index = username ?? 'Guest';
        const updated: Store = {
            ...stored,
            ...data,
            actions: {
                ...stored.actions,
                [index]: {
                    ...(stored.actions[index] || defaultAction),
                    ...data.actions?.[index]
                }
            }
        }
        localStorage.setItem('store', JSON.stringify(updated));
        return setStore(updated);
    }, [])

    const setActions = useCallback((data: Partial<Actions>, username?: string): void => {
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
        return setStore((prev: Store) => {
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

    const filters = (user: User | null): Event[] => {
        return user ? store.actions[user.username].filters : store.actions['Guest'].filters;
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
            filters,
            isStoreReady: isReady
        }}
        >
            {children}
        </UserStoreContext.Provider>
    )

}

export default UserStoreContext;