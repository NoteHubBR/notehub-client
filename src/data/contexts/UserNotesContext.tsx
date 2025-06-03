'use client';

import { createContext, useCallback, useMemo, useState } from "react";
import { LowDetailNote, Page } from "@/core";
import { UUID } from "crypto";

export interface UserNotesProps {
    page: Omit<Page<LowDetailNote>, 'content'>;
    notes: LowDetailNote[] | [];
    setNotes: (page: Page<LowDetailNote>) => void;
    setNewNote: (note: LowDetailNote) => void;
    setNoteToFirst: (id: UUID) => void;
    clearNotes: () => void;
}

const UserNotesContext = createContext<UserNotesProps>({} as any);

export const UserNotesProvider = (props: any) => {

    const initialState = useMemo(() => ({
        page: {} as Omit<Page<LowDetailNote>, 'content'>,
        notes: [] as LowDetailNote[],
    }), [])

    const [state, setState] = useState(initialState);

    const setter = useCallback((page: Page<LowDetailNote>): void => {
        const { content, ...rest } = page;
        return setState((prev) => ({
            page: rest,
            notes: [...prev.notes, ...content]
        }))
    }, [])

    const setNewNote = useCallback((note: LowDetailNote): void => {
        return setState((prev) => ({
            page: prev.page,
            notes: [note, ...prev.notes]
        }))
    }, [])

    const setNoteToFirst = useCallback((id: UUID): void => {
        setState((prev) => {
            const idx = prev.notes.findIndex((note) => note.id === id);
            const noteToMove = prev.notes[idx];
            const remainingNotes = prev.notes.filter((note) => note.id !== id);
            return {
                page: prev.page,
                notes: [noteToMove, ...remainingNotes],
            }
        })
    }, [])

    const clear = useCallback(() => { setState(initialState) }, [initialState]);

    return (
        <UserNotesContext.Provider value={{
            page: state.page,
            notes: state.notes,
            setNotes: setter,
            setNewNote: setNewNote,
            setNoteToFirst: setNoteToFirst,
            clearNotes: clear
        }}>
            {props.children}
        </UserNotesContext.Provider>
    )

}

export default UserNotesContext;