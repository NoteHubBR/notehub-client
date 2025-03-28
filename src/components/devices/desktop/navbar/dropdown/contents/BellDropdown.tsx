import { Loading } from "../elements/Loading";
import { Notification } from "../elements/Notification";
import { Section } from "../elements/NotificationSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNotifications, useServices, useUser } from "@/data/hooks";
import Image from "next/image";

export const BellDropdown = () => {

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
                {page.totalElements === 0 && isFetched &&
                    <div className="p-4 flex flex-col gap-2 items-center justify-center ">
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
            </Section>
        </>
    )

}