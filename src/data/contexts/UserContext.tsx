'use client';

import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { User, Token, shouldUseUserContext } from "@/core";
import { useServices } from "../hooks";

export interface UserContextProps {
    token: Token | null;
    user: User | null;
    setUser: (user: User, token: Token,) => void;
};

const UserContext = createContext<UserContextProps>({} as any);

export const UserContextProvider = (props: any) => {

    const { userService: { refreshUser } } = useServices();

    const [user, setUserState] = useState<User | null>(null);

    const [token, setTokenSate] = useState<Token | null>(null);

    const setUser = (user: User, token: Token) => {
        setUserState(user);
        setTokenSate(token);
    };

    const pathname = usePathname();

    useEffect(() => {
        if (shouldUseUserContext(pathname)) {
            const fetchUser = async () => {
                const { user, ...token } = await refreshUser();
                setUser(user, token);
            }
            fetchUser();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, token, setUser }}>
            {props.children}
        </UserContext.Provider>
    )

};

export default UserContext;