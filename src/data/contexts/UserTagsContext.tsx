'use client';

import { createContext, useCallback, useMemo, useState } from "react";
import { useNotes } from "../hooks";

export interface UserTagsProps {
    tags: null | string[];
    setTags: (tags: string[] | []) => void;
    setNewTags: (tags: string[]) => void;
    removeTags: (tags: string[]) => void;
    clearTags: () => void;
}

const UserTagsContext = createContext<UserTagsProps>({} as any);

export const UserTagsProvider = (props: any) => {

    const initialState = useMemo(() => ({
        tags: null as string[] | null
    }), [])

    const [state, setState] = useState(initialState);
    const { notes } = useNotes();

    const setter = useCallback((tags: string[] | []): void => {
        return setState({ tags: tags });
    }, [])

    const setNewTags = useCallback((tags: string[]): void => {
        setState(prev => {
            if (prev.tags === null) return prev;
            const merged = new Set([...prev.tags, ...tags]);
            if (merged.size === prev.tags.length) return prev;
            return { tags: Array.from(merged) };
        });
    }, [])

    const removeTags = useCallback((tags: string[]): void => {
        setState(prev => {
            if (prev.tags === null) return prev;
            const tagCount = new Map<string, number>();
            notes.forEach(note => {
                note.tags.forEach(tag => {
                    tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
                });
            })
            const singleUseTags = tags.filter(tag => tagCount.get(tag) === 1);
            if (singleUseTags.length === 0) return prev;
            const singleUseTagsSet = new Set(singleUseTags);
            const filtered = prev.tags.filter(tag => !singleUseTagsSet.has(tag));
            return { tags: filtered };
        })
    }, [notes])

    const clear = useCallback(() => { setState(initialState) }, [initialState]);

    return (
        <UserTagsContext.Provider value={{
            tags: state.tags,
            setTags: setter,
            setNewTags,
            removeTags,
            clearTags: clear
        }}>
            {props.children}
        </UserTagsContext.Provider>
    )

}

export default UserTagsContext;