'use client';

import { createContext, useCallback, useState } from "react";
import { SessionPreferences } from "@/core";

interface UserSessionPreferencesProps {
    pref: SessionPreferences;
    setPref: (data: Partial<SessionPreferences>) => void;
}

const UserSessionPreferencesContext = createContext<UserSessionPreferencesProps>({} as UserSessionPreferencesProps);

export const UserSessionPreferencesProvider = (props: any) => {

    const [pref, setPref] = useState<SessionPreferences>({
        isSponsorshipInviteAllowed: true
    });

    const setter = useCallback((data: Partial<SessionPreferences>): void => {
        const prefs: SessionPreferences = {
            isSponsorshipInviteAllowed: data.isSponsorshipInviteAllowed ?? pref.isSponsorshipInviteAllowed ?? true,
        }
        return setPref(prefs);
    }, [pref])

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