'use client';

import { createContext, useCallback, useState } from "react";
import { Flame, LowDetailNote, Note, Page } from "@/core";

interface UserFlamesProps {
    page: Omit<Page<Flame>, 'content'>;
    flames: null | Flame[];
    clearFlames: () => void;
    setFlames: (page: Page<Flame>) => void;
    setNewFlame: (flame: Flame) => void;
    removeFlame: (note: Note | LowDetailNote) => void;
}

interface State {
    page: Omit<Page<Flame>, 'content'>;
    flames: null | Flame[];
}

const initialState: State = {
    page: {} as State['page'],
    flames: null,
}

const UserFlamesContext = createContext<UserFlamesProps>({} as UserFlamesProps);

export const UserFlamesProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, setState] = useState(initialState);

    const clear = useCallback((): void => setState(initialState), []);

    const setter = useCallback((page: Page<Flame>): void => {
        const { content, ...rest } = page;
        setState((prev) => ({
            page: rest,
            flames: [...(prev.flames ?? []), ...content],
        }))
    }, [])

    const setNewFlame = useCallback((flame: Flame) => {
        setState((prev) => ({
            page: prev.page,
            flames: [flame, ...(prev.flames ?? [])],
        }))
    }, [])

    const remove = useCallback((note: Note | LowDetailNote) => {
        return setState((prev) => {
            if (!prev.flames) return prev;
            return {
                page: prev.page,
                flames: prev.flames.filter((f) => f.note.id !== note.id),
            }
        })
    }, [])

    return (
        <UserFlamesContext.Provider value={{
            page: state.page,
            flames: state.flames,
            clearFlames: clear,
            setFlames: setter,
            setNewFlame: setNewFlame,
            removeFlame: remove,
        }}>
            {children}
        </UserFlamesContext.Provider>
    )

}

export default UserFlamesContext;