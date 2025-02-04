'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Store, storeData } from "@/core";

export interface UserStoreProps {
    store: Store;
    setStore: (data: Partial<Store>) => void;
    isStoreReady: boolean;
}

const UserStoreContext = createContext<UserStoreProps>({} as any);

export const UserStoreProvider = (props: any) => {

    const [store, setStore] = useState({} as Store);

    const [isReady, setIsReady] = useState<boolean>(false);

    const setter = useCallback((data: Partial<Store>): void => {
        const stored: Store = {
            isFirstTimer: data.isFirstTimer ?? store.isFirstTimer ?? false,
            isGuest: data.isGuest ?? store.isGuest ?? false,
            isExpired: data.isExpired ?? store.isExpired ?? false,
            isDarkModeUser: data.isDarkModeUser ?? store.isDarkModeUser ?? false,
            isMenuOpen: data.isMenuOpen ?? store.isMenuOpen ?? false,
            searches: data.searches ?? store.searches ?? []
        }
        localStorage.setItem('store', JSON.stringify(stored));
        return setStore(stored);
    }, [store])

    useEffect(() => {
        storeData();
        const store: Store = JSON.parse(localStorage.getItem('store') ?? '{}');
        setStore(store);
        setIsReady(true);
    }, [])

    return (
        <UserStoreContext.Provider value={{ store, setStore: setter, isStoreReady: isReady }}>
            {props.children}
        </UserStoreContext.Provider>
    )

}

export default UserStoreContext;