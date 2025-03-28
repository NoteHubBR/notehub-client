'use client';

import { shouldUseUserContext } from "@/core";
import { Template } from "./templates";
import { useEffect } from "react";
import { useLoading, useScreen, useWidth } from "@/data/hooks";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const SplashScreen = () => {

    const { onDesktop, onMobile } = useScreen();

    const { width } = useWidth();

    const pathname = usePathname();

    const shouldRender = shouldUseUserContext(pathname);

    const { isLoaded, setIsLoaded } = useLoading();

    useEffect(() => {
        if (onDesktop && width <= 768 && shouldRender) setIsLoaded(false)
        else if (onMobile && width > 768 && shouldRender) setIsLoaded(false)
        else setIsLoaded(true)
    }, [onDesktop, onMobile, width, setIsLoaded, shouldRender])

    if (isLoaded) return null;

    return (
        <Template.Container className="z-[998] absolute top-0 left-0 flex items-center justify-center">
            <Image
                src={'/imgs/logo.png'}
                alt="Logo"
                width={180}
                height={0}
                priority
                className="animate-pulse"
            />
        </Template.Container>
    )

}