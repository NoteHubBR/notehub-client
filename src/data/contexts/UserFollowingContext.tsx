'use client';

import { createContext, useCallback, useState } from "react";
import { LowDetailUser, Page } from "@/core";

interface UserFollowingProps {
    page: Omit<Page<LowDetailUser>, 'content'>;
    users: LowDetailUser[] | [];
    setFollowing: (page: Page<LowDetailUser>) => void;
}

const UserFollowingContext = createContext<UserFollowingProps>({} as any);

export const UserFollowingProvider = (props: any) => {

    const [state, setState] = useState({
        page: {} as Omit<Page<LowDetailUser>, 'content'>,
        users: [] as LowDetailUser[],
    });

    const setter = useCallback((page: Page<LowDetailUser>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            page: rest,
            users: [...prev.users, ...content]
        }))
    }, [state])

    return (
        <UserFollowingContext.Provider value={{
            page: state.page,
            users: state.users,
            setFollowing: setter
        }}>
            {props.children}
        </UserFollowingContext.Provider>
    )

}

export default UserFollowingContext;