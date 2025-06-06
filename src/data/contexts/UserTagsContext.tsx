'use client';

import { createContext, useCallback, useMemo, useState } from "react";

export interface UserTagsProps {
    tags: string[] | [];
    setTags: (tags: string[] | []) => void;
    setNewTags: (tags: string[]) => void;
    clearTags: () => void;
}

const UserTagsContext = createContext<UserTagsProps>({} as any);

export const UserTagsProvider = (props: any) => {

    const initialState = useMemo(() => ({
        tags: [] as string[]
    }), [])

    const [state, setState] = useState(initialState);

    const setter = useCallback((tags: string[] | []): void => {
        return setState({ tags: tags });
    }, [])

    const setNewTags = useCallback((tags: string[]): void => {
        return setState((prev) => ({
            tags: [...prev.tags, ...tags]
        }))
    }, [])

    const clear = useCallback(() => { setState(initialState) }, [initialState]);

    return (
        <UserTagsContext.Provider value={{
            tags: state.tags,
            setTags: setter,
            setNewTags: setNewTags,
            clearTags: clear
        }}>
            {props.children}
        </UserTagsContext.Provider>
    )

}

export default UserTagsContext;