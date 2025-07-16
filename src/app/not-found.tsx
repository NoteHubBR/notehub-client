'use client';

import { Icon } from "@/components/icons";
import { Preferences } from "@/core";
import { Template } from "@/components/templates";
import { useEffect } from "react";
import Link from "next/link";

const NotFound = () => {

    useEffect(() => {
        const stored = localStorage.getItem('preferences') ?? null;
        const prefs: Preferences = stored
            ? JSON.parse(stored)
            : { useDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches }
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const updateTheme = () => {
            const dark = prefs.useDarkTheme;
            document.documentElement.classList.toggle('dark', dark);
            document.documentElement.classList.toggle('light', !dark);
        }
        updateTheme();
        mediaQuery.addEventListener('change', updateTheme);
        return () => mediaQuery.removeEventListener('change', updateTheme);
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