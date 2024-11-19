'use client';

import { createContext, useEffect, useState } from "react";

interface ThemeProps {
    isDarkMode: boolean;
    applyDarkMode: () => void;
    applyLightMode: () => void;
};

const ThemeContext = createContext<ThemeProps>({} as any);

export const ThemeProvider = (props: any) => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const applyDarkMode = () => setIsDarkMode(true);

    const applyLightMode = () => setIsDarkMode(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(mediaQuery.matches);
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider
            value={{
                isDarkMode,
                applyDarkMode,
                applyLightMode
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;