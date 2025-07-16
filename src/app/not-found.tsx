'use client';

import { Icon } from "@/components/icons";
import { Template } from "@/components/templates";
import { useEffect } from "react";
import Link from "next/link";

const NotFound = () => {

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            const isDark = e.matches;
            document.documentElement.classList.toggle("dark", isDark);
            document.documentElement.classList.toggle("light", !isDark);
        }
        updateTheme(mediaQuery);
        mediaQuery.addEventListener("change", updateTheme);
        return () => {
            mediaQuery.removeEventListener("change", updateTheme);
        }
    }, [])

    return (
        <main className="dark:bg-dark bg-light">
            <Template.Container className="flex items-center justify-center gap-4">
                <Link href={'/'} className="group pr-4 border-r dark:border-secondary/75 border-primary/75">
                    <Icon.Logo width={100} height={0} />
                </Link>
                <h1>Rota inválida.</h1>
            </Template.Container>
        </main>
    )

}

export default NotFound;