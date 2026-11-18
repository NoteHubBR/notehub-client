'use client';

import { createContext, useCallback, useState } from "react";
import { LowDetailUser, Page } from "@/core";

interface UserFollowingProps {
    page: Omit<Page<LowDetailUser>, 'content'>;
    users: null | LowDetailUser[];
    setFollowing: (page: Page<LowDetailUser>) => void;
    setNewFollowing: (user: LowDetailUser) => void;
    removeFollowing: (user: LowDetailUser) => void;
    clearFollowing: () => void;
}

interface State {
    page: Omit<Page<LowDetailUser>, 'content'>;
    users: null | LowDetailUser[];
}

const initialState: State = {
    page: {} as State['page'],
    users: null,
}

const UserFollowingContext = createContext<UserFollowingProps>({} as UserFollowingProps);

export const UserFollowingProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, setState] = useState(initialState);

    const clear = useCallback(() => setState(initialState), []);

    const setter = useCallback((page: Page<LowDetailUser>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            page: rest,
            users: [...(prev.users ?? []), ...content],
        }))
    }, [])

    const setNewFollowing = useCallback((user: LowDetailUser) => {
        return setState((prev) => ({
            page: prev.page,
            users: [user, ...(prev.users ?? [])],
        }))
    }, [])

    const removeFollowing = useCallback((user: LowDetailUser) => {
        return setState((prev) => {
            if (!prev.users) return prev;
            return {
                page: prev.page,
                users: prev.users.filter((u) => u.username !== user.username),
            }
        })
    }, [])

    return (
        <UserFollowingContext.Provider value={{
            page: state.page,
            users: state.users,
            setFollowing: setter,
            setNewFollowing,
            removeFollowing,
            clearFollowing: clear,
        }}>
            {children}
        </UserFollowingContext.Provider>
    )

}

export default UserFollowingContext;