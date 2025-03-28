'use client';

import { Navbar as GNavbar } from "./GuestNavbar";
import { Navbar as UNavbar } from "./UserNavbar";
import { shouldUseUserContext } from "@/core";
import { Skeleton } from "./Skeleton";
import { useLoading, useScreen, useStore, useUser } from "@/data/hooks"
import { usePathname } from "next/navigation";

export const Navbar = () => {

    const pathname = usePathname();
    const shouldRender = shouldUseUserContext(pathname);

    const { onDesktop } = useScreen();
    const { isLoaded } = useLoading();
    const { store: { isFirstTimer, isGuest, isExpired } } = useStore();
    const { user } = useUser();

    if (!shouldRender || !onDesktop || !isLoaded) return null;

    if (!user && !isFirstTimer && !isGuest && !isExpired) return <Skeleton />;

    if (isFirstTimer || isGuest || isExpired) return <GNavbar />;

    if (user) return <UNavbar user={user} />;

}