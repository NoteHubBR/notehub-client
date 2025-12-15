'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import { SessionPreferences, storeSessionPref } from "@/core";

interface UserSessionPreferencesProps {
    pref: SessionPreferences;
    setPref: (data: Partial<SessionPreferences>) => void;
}

const UserSessionPreferencesContext = createContext<UserSessionPreferencesProps>({} as UserSessionPreferencesProps);

export const UserSessionPreferencesProvider = (props: any) => {

    const [pref, setPref] = useState({} as SessionPreferences);

    const setter = useCallback((data: Partial<SessionPreferences>): void => {
        const prefs: SessionPreferences = {
            isSponsorshipInviteAllowed: data.isSponsorshipInviteAllowed ?? pref.isSponsorshipInviteAllowed ?? true,
        }
        sessionStorage.setItem('preferences', JSON.stringify(prefs));
        return setPref(prefs);
    }, [pref])

    useEffect(() => {
        storeSessionPref();
        return setPref(JSON.parse(sessionStorage.getItem('preferences') ?? '{}'));
    }, [])

    return (
        <UserSessionPreferencesContext.Provider value={{
            pref,
            setPref: setter,
        }}>
            {props.children}
        </UserSessionPreferencesContext.Provider>
    )

}

export default UserSessionPreferencesContext;