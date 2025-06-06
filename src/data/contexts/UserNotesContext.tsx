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
    updateNote: (id: UUID, newTitle: string) => void;
    removeNote: (id: UUID) => void;
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
        return setState((prev) => {
            const idx = prev.notes.findIndex((note) => note.id === id);
            const noteToMove = prev.notes[idx];
            const remainingNotes = prev.notes.filter((note) => note.id !== id);
            return {
                page: prev.page,
                notes: [noteToMove, ...remainingNotes]
            }
        })
    }, [])

    const updateNote = useCallback((id: UUID, newTitle: string) => {
        setState(prev => {
            const updatedNotes = prev.notes.map(note => note.id === id ? { ...note, title: newTitle } : note);
            const idx = updatedNotes.findIndex(note => note.id === id);
            if (idx < 0) return prev;
            const [noteToMove] = updatedNotes.splice(idx, 1);
            return {
                page: prev.page,
                notes: [noteToMove, ...updatedNotes]
            }
        })
    }, [])

    const removeNote = useCallback((id: UUID) => {
        setState((prev) => ({
            page: prev.page,
            notes: prev.notes.filter((note) => note.id !== id)
        }))
    }, [])

    const clear = useCallback(() => { setState(initialState) }, [initialState]);

    return (
        <UserNotesContext.Provider value={{
            page: state.page,
            notes: state.notes,
            setNotes: setter,
            setNewNote: setNewNote,
            setNoteToFirst: setNoteToFirst,
            updateNote: updateNote,
            removeNote: removeNote,
            clearNotes: clear
        }}>
            {props.children}
        </UserNotesContext.Provider>
    )

}

export default UserNotesContext;