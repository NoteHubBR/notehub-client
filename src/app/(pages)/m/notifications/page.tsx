'use client';

import { Device } from "@/components/devices";
import { Loading } from "@/components/devices/desktop/navbar/dropdown/elements/Loading";
import { Notification } from "@/components/devices/desktop/navbar/dropdown/elements/Notification";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNotifications, useScreen, useServices, useUser } from "@/data/hooks";
import Image from "next/image";

const Notifications = () => {

    const { onMobile } = useScreen();

    const { userService: { getUserNotifications } } = useServices();

    const { token } = useUser();

    const { page, notifications, setNotifications } = useNotifications();

    const [isFetching, setisFetching] = useState<boolean>(false);
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const hasFetchedAndEmptyList = useRef<boolean>(false);

    const sectionRef = useRef<HTMLDivElement>(null);

    const init = useCallback(async () => {
        if (isFetchingRef.current || notifications.length > 0 || hasFetchedAndEmptyList.current) return;
        try {
            if (token) {
                isFetchingRef.current = true;
                setisFetching(true);
                const page = await getUserNotifications(token.access_token, 'page=0');
                if (page.totalElements === 0) hasFetchedAndEmptyList.current = true;
                return setNotifications(page);
            }
        } finally {
            isFetchingRef.current = false;
            setisFetching(false);
            setIsFetched(true);
        }
    }, [getUserNotifications, notifications.length, setNotifications, token])

    const handleScroll = useCallback(async () => {
        if (!token || page.last || !sectionRef.current || isFetchingRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
            try {
                isFetchingRef.current = true;
                setisFetching(true);
                setNotifications(await getUserNotifications(token.access_token, `page=${page.page + 1}`));
            } finally {
                isFetchingRef.current = false;
                setisFetching(false);
            }
        }
    }, [getUserNotifications, page.last, page.page, setNotifications, token]);

    useEffect(() => {
        init();
        const section = sectionRef.current;
        if (!section) return;
        section.addEventListener("scroll", handleScroll);
        return () => section.removeEventListener("scroll", handleScroll);
    }, [handleScroll, init]);

    if (!onMobile) return null;

    return (
        <section className="h-[calc(100svh-45px)] flex flex-col dark:bg-dark bg-light">
            <Device.Mobile.Header.SimpleHeader title="Notificações" />
            <main ref={sectionRef} className="overflow-y-auto scrollbar h-full flex flex-col">
                <ul className="flex flex-col gap-2">
                    {notifications.map(notification => (
                        <li key={notification.id} className={`p-2 ${!notification.read ? 'dark:bg-semilight/5' : 'bg-semidark/5'}`}>
                            <Notification notification={notification} />
                        </li>
                    ))}
                </ul>
                <Loading state={isFetching} />
                {page.totalElements === 0 && isFetched &&
                    <div className="flex-1 p-4 flex flex-col gap-2 items-center justify-center">
                        <h2 className="text-md text-center font-faculty font-medium">Nada aqui.</h2>
                        <p className="text-sm text-center font-faculty font-medium">Dê um sinal para que vejam!</p>
                        <figure style={{ width: 133, height: 133 }} className={`overflow-hidden flex-none`}>
                            <Image
                                src='/svgs/torch.svg'
                                width={133}
                                height={133}
                                alt='Tocha'
                                className="w-full h-full object-cover"
                            />
                        </figure>
                    </div>
                }
            </main>
        </section>
    )

}

export default Notifications;