import { createContext } from "react";
import { User } from "@/core";

export interface UserContextProps {
    user: User;
};

const UserContext = createContext<UserContextProps>({} as any);

export const UserContextProvider = (props: any) => {

    return (
        <UserContextProvider>
            {props.children}
        </UserContextProvider>
    )

};

export default UserContext;