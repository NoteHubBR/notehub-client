'use client';

import { createContext, useState } from "react";
import { Token, User } from "@/core";

export interface UserContextProps {
    token: Token | null;
    user: User | null;
    setUser: (user: User, token: Token,) => void;
};

const UserContext = createContext<UserContextProps>({} as any);

export const UserContextProvider = (props: any) => {

    const [user, setUserState] = useState<User | null>(null);

    const [token, setTokenSate] = useState<Token | null>(null);

    const setUser = (user: User, token: Token) => {
        setUserState(user);
        setTokenSate(token);
    };

    return (
        <UserContext.Provider value={{ user, token, setUser }}>
            {props.children}
        </UserContext.Provider>
    )

};

export default UserContext;