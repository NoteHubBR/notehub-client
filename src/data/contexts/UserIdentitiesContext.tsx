'use client';

import { createContext, useState } from "react";
import { Identities } from '@/core';

export interface UserIdentitiesProps {
    identities: Identities,
    setIdentities: React.Dispatch<React.SetStateAction<Identities>>,
    clearIdentities: () => void,
}

const UserIdentitiesContext = createContext<UserIdentitiesProps>({} as any);

export const UserIdentitiesProvider = ({ children }: { children: React.ReactNode }) => {
    const initialState = [] as Identities;
    const [identities, setIdentities] = useState(initialState);
    const clearIdentities = () => setIdentities(initialState);
    return (
        <UserIdentitiesContext.Provider value={{
            identities,
            setIdentities,
            clearIdentities,
        }}>
            {children}
        </UserIdentitiesContext.Provider>
    )
}

export default UserIdentitiesContext;