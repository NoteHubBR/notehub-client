'use client';

import { createContext, useCallback, useState } from "react";
import { Flame, LowDetailNote, Note, Page } from "@/core";

interface UserFlamesProps {
    page: Omit<Page<Flame>, 'content'>;
    flames: Flame[] | [];
    clearFlames: () => void;
    setFlames: (page: Page<Flame>) => void;
    setNewFlame: (flame: Flame) => void;
    removeFlame: (note: Note | LowDetailNote) => void;
}

const UserFlamesContext = createContext<UserFlamesProps>({} as any);

export const UserFlamesProvider = (props: any) => {

    const initialState = {
        page: {} as Omit<Page<Flame>, 'content'>,
        flames: [] as Flame[]
    }

    const [state, setState] = useState(initialState);

    const clear = useCallback((): void => { return setState(initialState) }, []);

    const setter = useCallback((page: Page<Flame>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            page: rest,
            flames: [...prev.flames, ...content]
        }))
    }, [])

    const setNewFlame = useCallback((flame: Flame) => {
        return setState((prev) => ({
            page: prev.page,
            flames: [flame, ...prev.flames]
        }))
    }, [])

    const remove = useCallback((note: Note | LowDetailNote) => {
        return setState((prev) => ({
            page: prev.page,
            flames: prev.flames.filter((f) => f.note.id !== note.id)
        }))
    }, [])

    return (
        <UserFlamesContext.Provider value={{
            page: state.page,
            flames: state.flames,
            clearFlames: clear,
            setFlames: setter,
            setNewFlame: setNewFlame,
            removeFlame: remove
        }}>
            {props.children}
        </UserFlamesContext.Provider>
    )

}

export default UserFlamesContext;