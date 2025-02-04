'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { Page, Notification } from "@/core";
import { useUser } from "../hooks";

interface UserNotificationsProps {
    notificationsCount: number;
    notificationsPage: Omit<Page<Notification>, 'content'>;
    notifications: Notification[] | [];
    setNotifications: (page: Page<Notification>) => void;
}

const UserNotificationsContext = createContext<UserNotificationsProps>({} as any);

export const UserNotificationsProvider = (props: any) => {

    const { user } = useUser();

    const [state, setState] = useState({
        notificationsCount: 0 as number,
        notificationsPage: {} as Omit<Page<Notification>, 'content'>,
        notifications: [] as Notification[],
    })

    const setNotifications = useCallback((page: Page<Notification>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            ...prev,
            notificationsPage: rest,
            notifications: [...prev.notifications, ...content],
            notificationsCount: [...prev.notifications, ...content].filter(n => !n.read).length
        }))
    }, [])

    const setTitle = useCallback((count: number): string => {
        setState((prev) => ({ ...prev, notificationsCount: count }));
        const title = `${count > 0 ? `(${count}) XYZ` : 'XYZ'}`;
        return document.title = title;
    }, [])

    useEffect(() => {
        if (user) setTitle(user.notifications);
        else setTitle(0);
    }, [setTitle, user])

    useEffect(() => {
        setTitle(state.notificationsCount);
    }, [setTitle, state.notificationsCount])

    return (
        <UserNotificationsContext.Provider value={{
            notificationsCount: state.notificationsCount,
            notificationsPage: state.notificationsPage,
            notifications: state.notifications,
            setNotifications
        }}>
            {props.children}
        </UserNotificationsContext.Provider>
    )

}

export default UserNotificationsContext;