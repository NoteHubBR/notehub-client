'use client';

import { createContext, useCallback, useState } from "react";
import { LowDetailNote, NoteUpdateFormData, Page, toNewDate, User } from "@/core";
import { UUID } from "crypto";

export interface UserNotesProps {
    page: Omit<Page<LowDetailNote>, 'content'>;
    notes: null | LowDetailNote[];
    setNotes: (page: Page<LowDetailNote>) => void;
    setNewNote: (note: LowDetailNote) => void;
    setNoteToFirst: (id: UUID) => void;
    updateNote: (id: UUID, data: NoteUpdateFormData) => void;
    updateNotesUser: (data: Partial<User>) => void;
    removeNote: (id: UUID) => void;
    clearNotes: () => void;
}

interface State {
    page: Omit<Page<LowDetailNote>, 'content'>;
    notes: null | LowDetailNote[];
}

const initialState: State = {
    page: {} as State['page'],
    notes: null,
}

const UserNotesContext = createContext<UserNotesProps>({} as UserNotesProps);

export const UserNotesProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, setState] = useState<State>(initialState);

    const setter = useCallback((page: Page<LowDetailNote>): void => {
        const { content, ...rest } = page;
        setState((prev) => ({
            page: rest,
            notes: [...(prev.notes ?? []), ...content],
        }))
    }, [])

    const setNewNote = useCallback((note: LowDetailNote): void => {
        setState((prev) => ({
            page: prev.page,
            notes: [note, ...(prev.notes ?? [])],
        }))
    }, [])

    const setNoteToFirst = useCallback((id: UUID): void => {
        setState((prev) => {
            if (!prev.notes) return prev;
            const idx = prev.notes.findIndex((note) => note.id === id);
            const noteToMove = prev.notes[idx];
            const remainingNotes = prev.notes.filter((note) => note.id !== id);
            return {
                page: prev.page,
                notes: [noteToMove, ...remainingNotes]
            }
        })
    }, [])

    const updateNote = useCallback((id: UUID, data: NoteUpdateFormData) => {
        setState(prev => {
            if (!prev.notes) return prev;
            const updatedNotes = prev.notes.map(note => note.id === id ? { ...note, ...data, modified_at: toNewDate(new Date()) } : note);
            const idx = updatedNotes.findIndex(note => note.id === id);
            if (idx < 0) return prev;
            const [noteToMove] = updatedNotes.splice(idx, 1);
            return {
                page: prev.page,
                notes: [noteToMove, ...updatedNotes]
            }
        })
    }, [])

    const updateNotesUser = useCallback((data: Partial<User>) => {
        setState((prev) => {
            if (!prev.notes) return prev;
            return {
                page: prev.page,
                notes: prev.notes.map((note) => {
                    if (note.user) {
                        return {
                            ...note,
                            user: {
                                ...note.user,
                                ...data
                            }
                        }
                    }
                    return note;
                })
            }
        })
    }, [])

    const removeNote = useCallback((id: UUID) => {
        setState((prev) => {
            if (!prev.notes) return prev;
            return {
                page: prev.page,
                notes: prev.notes.filter((note) => note.id !== id)
            }
        })
    }, [])

    const clear = useCallback(() => setState(initialState), []);

    return (
        <UserNotesContext.Provider value={{
            page: state.page,
            notes: state.notes,
            setNotes: setter,
            setNewNote,
            setNoteToFirst,
            updateNote,
            updateNotesUser,
            removeNote,
            clearNotes: clear,
        }}>
            {children}
        </UserNotesContext.Provider>
    )

}

export default UserNotesContext;