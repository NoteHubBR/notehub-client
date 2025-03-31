'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Page, Notification } from "@/core";
import { useUser } from "../hooks";

interface UserNotificationsProps {
    count: number;
    page: Omit<Page<Notification>, 'content'>;
    notifications: Notification[] | [];
    setNotifications: (page: Page<Notification>) => void;
    clearNotifications: () => void;
}

const UserNotificationsContext = createContext<UserNotificationsProps>({} as any);

export const UserNotificationsProvider = (props: any) => {

    const { user } = useUser();

    const initialState = {
        count: 0 as number,
        page: {} as Omit<Page<Notification>, 'content'>,
        notifications: [] as Notification[],
    }

    const [state, setState] = useState(initialState)

    const clearNotifications = useCallback(() => setState(initialState), []);

    const setNotifications = useCallback((page: Page<Notification>): void => {
        const { content, ...rest } = page;
        return setState((prev) => {
            const uniques = content.filter(newN => !prev.notifications.some(oldN => oldN.id === newN.id))
            return {
                ...prev,
                page: rest,
                notifications: [...prev.notifications, ...uniques],
                count: user!.notifications - [...prev.notifications, ...content].filter(n => !n.read).length
            }
        })
    }, [user])

    const setTitle = useCallback((count: number): string => {
        setState((prev) => ({ ...prev, count: count }));
        const title = `${count > 0 ? `(${count}) XYZ` : 'XYZ'}`;
        return document.title = title;
    }, [])

    useEffect(() => {
        clearNotifications();
        if (user) setTitle(user.notifications);
        else setTitle(0);
    }, [clearNotifications, setTitle, user])

    useEffect(() => {
        setTitle(state.count);
    }, [setTitle, state.count])

    return (
        <UserNotificationsContext.Provider value={{
            count: state.count,
            page: state.page,
            notifications: state.notifications,
            setNotifications,
            clearNotifications
        }}>
            {props.children}
        </UserNotificationsContext.Provider>
    )

}

export default UserNotificationsContext;