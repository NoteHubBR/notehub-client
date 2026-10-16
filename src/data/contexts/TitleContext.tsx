'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { resolveRouteTitle } from '@/core';
import { usePathname } from 'next/navigation';
import UserNotificationsContext from './UserNotificationsContext';

interface TitleProps {
    setTitle: (title: string) => void;
}

const TitleContext = createContext<TitleProps>({} as TitleProps);

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {

    const { count } = useContext(UserNotificationsContext);
    const pathname = usePathname();

    const [override, setOverride] = useState<{ path: string; title: string } | null>(null);

    const setTitle = useCallback(
        (title: string) => setOverride({ path: pathname, title }),
        [pathname]
    )

    const base = override?.path === pathname
        ? override.title
        : resolveRouteTitle(pathname);

    const title = count > 0 ? `(${count}) ${base}` : base;

    useEffect(() => {
        const apply = () => {
            if (document.title !== title) document.title = title;
        }
        apply();
        const observer = new MutationObserver(apply);
        observer.observe(document.head, {
            childList: true,
            characterData: true,
            subtree: true,
        });
        return () => observer.disconnect();
    }, [title])

    return (
        <TitleContext.Provider value={{ setTitle }}>
            {children}
        </TitleContext.Provider>
    )

}

export default TitleContext;