'use client';

import { createContext, useEffect } from "react";
import { useUser } from "../hooks";

const ThemeContext = createContext({} as any);

export const ThemeProvider = (props: any) => {

    const { store, setStore } = useUser();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setStore({ isDarkModeUser: e.matches })
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", store?.isDarkModeUser);
    }, [store?.isDarkModeUser]);

    return (
        <ThemeContext.Provider value={{}}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;