'use client';

import { Navbar as GuestNavbar } from "./GuestNavbar";
import { Navbar as UserNavbar } from "./UserNavbar";
import { shouldRenderNavbarAndSidebar } from "@/core";
import { Skeleton } from "./Skeleton";
import { useLoading, useScreen, useStore, useUser } from "@/data/hooks"
import { usePathname } from "next/navigation";

export const Navbar = () => {

    const pathname = usePathname();
    const shouldRender = shouldRenderNavbarAndSidebar(pathname);

    const { store: { isFirstTimer, isGuest, isExpired } } = useStore();
    const { onDesktop } = useScreen();
    const { isLoaded } = useLoading();
    const { user } = useUser();

    if (!shouldRender || !onDesktop || !isLoaded) return null;

    if (!user && !isFirstTimer && !isGuest && !isExpired) return <Skeleton />;

    if (isGuest || isExpired) return <GuestNavbar />;

    if (user) return <UserNavbar user={user} />;

}