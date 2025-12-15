'use client';

import { createContext, useEffect } from "react";
import { usePref } from "../hooks";

const ThemeContext = createContext({} as any);

export const ThemeProvider = (props: any) => {

    const { pref, setPref } = usePref();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setPref({ useDarkTheme: e.matches })
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [setPref])

    useEffect(() => {
        if (pref.useDarkTheme) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, [pref.useDarkTheme])

    useEffect(() => {
        if (pref.useColors) {
            document.documentElement.style.setProperty("--primary", pref.useColors.primary);
            document.documentElement.style.setProperty("--secondary", pref.useColors.secondary);
            document.documentElement.style.setProperty("--inverted", pref.useColors.inverted);
        }
    }, [pref.useColors])

    return (
        <ThemeContext.Provider value={{}}>
            {props.children}
        </ThemeContext.Provider>
    )

}

export default ThemeContext;