'use client'

import { IconCompass, IconHome, IconPlus, IconUserCircle, IconUsers } from "@tabler/icons-react"
import { Item } from "./elements/Item";
import { List } from "./elements/List";
import { Picture } from "./elements/Picture";
import { shouldUseUserContext } from "@/core";
import { useLoading, useScreen, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export const Navbar = () => {

    const pathname = usePathname();

    const shouldRender = shouldUseUserContext(pathname);

    const { onMobile } = useScreen();

    const { isLoaded } = useLoading();

    const { user } = useUser();

    if (!shouldRender || !onMobile || !isLoaded) return null;

    const Nav: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
        return (
            <nav
                className="
                    fixed bottom-0 
                    w-full h-[45px] px-4 
                    border-t dark:border-neutral-50/10 border-neutral-900/10
                    dark:bg-neutral-900 bg-neutral-50
                "
                {...rest}
            >
                {children}
            </nav>
        );
    };

    if (!user) return (
        <Nav>
            <List>
                <Item href='/' text="Início"><IconHome size={22} /></Item>
                <Item href='/signin' text="Explorar"><IconCompass size={22} /></Item>
                <Item href='/signin'><IconPlus size={22} /></Item>
                <Item href='/signin' text="Seguindo"><IconUsers size={22} /></Item>
                <Item href='/signin' text="Você"><IconUserCircle size={22} /></Item>
            </List>
        </Nav>
    );

    return (
        <Nav>
            <List>
                <Item href='/' text="Início"><IconHome size={22} /></Item>
                <Item href='/explore' text="Explorar"><IconCompass size={22} /></Item>
                <Item href='/new'><IconPlus size={22} /></Item>
                <Item href={`/${user.username}/following`} text="Seguindo"><IconUsers size={22} /></Item>
                <Item href={`/${user.username}`} text="Você"><Picture user={user} /></Item>
            </List>
        </Nav>
    )

}