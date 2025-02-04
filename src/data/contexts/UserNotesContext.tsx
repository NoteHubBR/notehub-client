'use client';

import { createContext, useCallback, useState } from "react";
import { LowDetailNote, Page } from "@/core";

export interface UserNotesProps {
    page: Omit<Page<LowDetailNote>, 'content'>;
    notes: LowDetailNote[] | [];
    setNotes: (page: Page<LowDetailNote>) => void;
}

const UserNotesContext = createContext<UserNotesProps>({} as any);

export const UserNotesProvider = (props: any) => {

    const [state, setState] = useState({
        page: {} as Omit<Page<LowDetailNote>, 'content'>,
        notes: [] as LowDetailNote[],
    });

    const setter = useCallback((page: Page<LowDetailNote>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            page: rest,
            notes: [...prev.notes, ...content]
        }))
    }, [state])

    return (
        <UserNotesContext.Provider value={{ page: state.page, notes: state.notes, setNotes: setter }}>
            {props.children}
        </UserNotesContext.Provider>
    )

}

export default UserNotesContext;