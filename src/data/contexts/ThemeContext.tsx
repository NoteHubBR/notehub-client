'use client';

import { createContext, useEffect } from "react";
import { useStore } from "../hooks";

const ThemeContext = createContext({} as any);

export const ThemeProvider = (props: any) => {

    const { store, setStore } = useStore();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setStore({ isDarkModeUser: e.matches })
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (store?.isDarkModeUser) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, [store?.isDarkModeUser]);



    return (
        <ThemeContext.Provider value={{}}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;