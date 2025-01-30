import { Loading } from "../elements/Loading";
import { Notification } from "../elements/Notification";
import { Section } from "../elements/NotificationSection";
import { useEffect, useRef, useState } from "react";
import { useServices, useUser } from "@/data/hooks";

export const BellDropdown = () => {

    const { token, notificationsPage: pages, notifications, setNotifications } = useUser();

    const { userService: { getUserNotifications } } = useServices();
    
    const [page, setPage] = useState<number | undefined>(pages?.page)

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sectionRef = useRef<HTMLDivElement>(null);

    const handleScroll = async () => {
        if (!sectionRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
        if (!pages?.last && scrollTop + clientHeight >= scrollHeight && token) {
            setIsLoading(true);
            const response = await getUserNotifications(token.access_token, `page=${page}`);
            setNotifications(response);
            setIsLoading(false)
            if (!response.last) setPage((prev) => prev && prev + 1)
        }
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        section.addEventListener("scroll", handleScroll);
        return () => section.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className='p-3'><h1 className='text-md'>Notificações</h1></header>
            <Section ref={sectionRef}>
                {notifications.map(notification =>
                    [...Array(3)].map((_, index) => (
                        <Notification key={`${notification.id}-${index}`} notification={notification} />
                    ))
                )}

                {isLoading && <Loading />}

            </Section>
        </>
    )

}