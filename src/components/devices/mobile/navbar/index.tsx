'use client'

import { Component } from "@/components";
import { IconHome, IconNotes, IconPlus, IconSearch, IconUserCircle } from "@tabler/icons-react"
import { Item } from "./elements/Item";
import { List } from "./elements/List";
import { shouldUseUserContext } from "@/core";
import { Skeleton } from "./skeleton";
import { useLoading, useScreen, useStore, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export const Navbar = () => {

    const pathname = usePathname();

    const shouldRender = shouldUseUserContext(pathname);

    const { store: { isFirstTimer, isGuest, isExpired } } = useStore();
    const { onMobile } = useScreen();
    const { isLoaded } = useLoading();
    const { user } = useUser();

    if (!shouldRender || !onMobile || !isLoaded) return null;

    const Nav = ({ children, ...rest }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => {
        return (
            <nav
                className="z-[997] fixed bottom-0
                    w-full h-[45px] px-4
                    border-t dark:border-lighter/10 border-dark/10
                    dark:bg-darker bg-lighter"
                {...rest}
            >
                {children}
            </nav>
        )
    }

    if (!isFirstTimer && !isGuest && !user && !isExpired) return <Skeleton />;

    if (isGuest || isExpired) return (
        <Nav>
            <List>
                <Item href='/' icon={IconHome} />
                <Item href='/search' icon={IconSearch} />
                <Item href='/signin' icon={IconPlus} className="p-1 rounded-full dark:bg-semidark bg-semilight" />
                <Item href='/signin' icon={IconNotes} />
                <Item href='/signin' icon={IconUserCircle} />
            </List>
        </Nav>
    )

    if (user) return (
        <Nav>
            <List>
                <Item href='/' icon={IconHome} />
                <Item href='/search' icon={IconSearch} />
                <Item href='/new' icon={IconPlus} className="p-1 rounded-full dark:bg-semidark bg-semilight" />
                <Item href={`/${user.username}/notes`} icon={IconNotes} />
                <Item href={`/${user.username}`}><Component.Photo user={user} size={24} /></Item>
            </List>
        </Nav>
    )

}