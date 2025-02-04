'use client';

import { Preferences, storePref } from "@/core";
import { createContext, useCallback, useEffect, useState } from "react";

interface UserPreferencesProps {
    pref: Preferences;
    setPref: (data: Partial<Preferences>) => void;
    setTheme: (theme: string) => void;
}

const UserPreferencesContext = createContext<UserPreferencesProps>({} as any);

export const UserPreferencesProvider = (props: any) => {

    const [pref, setPref] = useState({} as Preferences);

    const setter = useCallback((data: Partial<Preferences>): void => {
        const prefs: Preferences = {
            useDarkTheme: data.useDarkTheme ?? pref.useDarkTheme ?? false,
        }
        localStorage.setItem('preferences', JSON.stringify(prefs));
        return setPref(prefs);
    }, [pref])

    const setTheme = useCallback((theme: string): void => {
        if (theme === 'dark') return setter({ useDarkTheme: true });
        if (theme === 'light') return setter({ useDarkTheme: false });
    }, [])

    useEffect(() => {
        storePref();
        return setPref(JSON.parse(localStorage.getItem('preferences') ?? '{}'));
    }, [])

    return (
        <UserPreferencesContext.Provider value={{
            pref,
            setPref: setter,
            setTheme,
        }}>
            {props.children}
        </UserPreferencesContext.Provider>
    )

}

export default UserPreferencesContext;