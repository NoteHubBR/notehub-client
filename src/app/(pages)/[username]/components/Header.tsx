'use client';

import { Header as DesktopHeader } from "./desktop/Header";
import { useScreen } from "@/data/hooks";

export const Header = () => {

    const { onDesktop, onMobile } = useScreen();

    if (onDesktop) return <DesktopHeader />

    if (onMobile) return <></>;

}