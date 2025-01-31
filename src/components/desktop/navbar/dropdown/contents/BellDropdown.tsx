import { Loading } from "../elements/Loading";
import { Notification } from "../elements/Notification";
import { Section } from "../elements/NotificationSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServices, useUser } from "@/data/hooks";

export const BellDropdown = () => {

    const { token, notificationsPage: pages, notifications, setNotifications } = useUser();

    const { userService: { getUserNotifications } } = useServices();

    const [isFetching, setisFetching] = useState<boolean>(false);
    
    const isFetchingRef = useRef<boolean>(false);

    const sectionRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(async () => {
        if (!token || pages.last || !sectionRef.current || isFetchingRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
            try {
                isFetchingRef.current = true;
                setisFetching(true);
                setNotifications(await getUserNotifications(token.access_token, `page=${pages.page + 1}`));
            } finally {
                isFetchingRef.current = false;
                setisFetching(false);
            }
        }
    }, [pages]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        section.addEventListener("scroll", handleScroll);
        return () => section.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <>
            <header className="p-3">
                <h1 className="text-md">Notificações</h1>
            </header>
            <Section ref={sectionRef}>
                {notifications.map(notification => (
                    <Notification key={notification.id} notification={notification} />
                ))}
                <Loading state={isFetching} />
            </Section>
        </>
    );

};