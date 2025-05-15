'use client';

import { Colors, Preferences, storePref } from "@/core";
import { createContext, useCallback, useEffect, useState } from "react";

interface UserPreferencesProps {
    pref: Preferences;
    setPref: (data: Partial<Preferences>) => void;
    setTheme: (theme: string) => void;
    setColors: (colors: Colors) => void;
}

const UserPreferencesContext = createContext<UserPreferencesProps>({} as any);

export const UserPreferencesProvider = (props: any) => {

    const [pref, setPref] = useState({} as Preferences);

    const setter = useCallback((data: Partial<Preferences>): void => {
        const prefs: Preferences = {
            useDarkTheme: data.useDarkTheme ?? pref.useDarkTheme ?? false,
            useColors: {
                shades: data.useColors?.shades ?? pref.useColors.shades ?? "violet",
                primary: data.useColors?.primary ?? pref.useColors.primary ?? "124, 58, 237",
                secondary: data.useColors?.secondary ?? pref.useColors.secondary ?? "139, 92, 246"
            }
        }
        localStorage.setItem('preferences', JSON.stringify(prefs));
        return setPref(prefs);
    }, [pref])

    const setTheme = useCallback((theme: string): void => {
        if (theme === 'dark') return setter({ useDarkTheme: true });
        if (theme === 'light') return setter({ useDarkTheme: false });
    }, [setter])

    const setColors = useCallback((colors: Colors): void => {
        return setter({
            useColors: {
                shades: colors.shades,
                primary: colors.primary,
                secondary: colors.secondary
            }
        })
    }, [setter])

    useEffect(() => {
        storePref();
        return setPref(JSON.parse(localStorage.getItem('preferences') ?? '{}'));
    }, [])

    return (
        <UserPreferencesContext.Provider value={{
            pref,
            setPref: setter,
            setTheme,
            setColors
        }}>
            {props.children}
        </UserPreferencesContext.Provider>
    )

}

export default UserPreferencesContext;