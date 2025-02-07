'use client';

import { createContext, useCallback, useState } from "react";
import { LowDetailNote, Page } from "@/core";

export interface UserNotesProps {
    page: Omit<Page<LowDetailNote>, 'content'>;
    notes: LowDetailNote[] | [];
    setNotes: (page: Page<LowDetailNote>) => void;
    clearNotes: () => void;
}

const UserNotesContext = createContext<UserNotesProps>({} as any);

export const UserNotesProvider = (props: any) => {

    const initialState = {
        page: {} as Omit<Page<LowDetailNote>, 'content'>,
        notes: [] as LowDetailNote[],
    }

    const [state, setState] = useState(initialState);

    const clear = useCallback(() => { setState(initialState) }, []);
    
    const setter = useCallback((page: Page<LowDetailNote>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            page: rest,
            notes: [...prev.notes, ...content]
        }))
    }, [state])

    return (
        <UserNotesContext.Provider value={{
            page: state.page,
            notes: state.notes,
            setNotes: setter,
            clearNotes: clear
        }}>
            {props.children}
        </UserNotesContext.Provider>
    )

}

export default UserNotesContext;