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

    const init = async () => {
        if (isFetchingRef.current || notifications.length > 0 || hasFetchedAndEmptyList.current) return;
        try {
            if (token) {
                isFetchingRef.current = true;
                setisFetching(true);
                const page = await getUserNotifications(token.access_token);
                if (page.totalElements === 0) hasFetchedAndEmptyList.current = true;
                return setNotifications(page);
            }
        } finally {
            isFetchingRef.current = false;
            setisFetching(false);
            setIsFetched(true);
        }
    }

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
    }, [page]);

    useEffect(() => {
        init();
        const section = sectionRef.current;
        if (!section) return;
        section.addEventListener("scroll", handleScroll);
        return () => section.removeEventListener("scroll", handleScroll);
    }, [token, handleScroll]);

    if (!onMobile) return null;

    return (
        <section ref={sectionRef} className="w-full h-full flex flex-col dark:bg-dark bg-lighter">
            <Device.Mobile.Header.SimpleHeader title="Notificações" />
            <main className="flex-1 flex flex-col justify-center">
                <ul className="flex flex-col gap-2">
                    {notifications.map(notification => (
                        <li key={notification.id} className="even:dark:bg-semilight/15 even:bg-semidark/15 p-2">
                            <Notification notification={notification} />
                        </li>
                    ))}
                </ul>
                <Loading state={isFetching} />
                {page.totalElements === 0 && isFetched &&
                    <div className="p-4 flex flex-col gap-2 items-center justify-center">
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