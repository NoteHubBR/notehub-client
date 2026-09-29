'use client';

import { createContext, useEffect, useState } from 'react';
import { defaultDrafts, Drafts, UserDrafts, capUserDrafts, readDrafts, storeDrafts, writeDrafts, Draft } from '@/core';

type DraftCategory = keyof Drafts;

interface DraftsProps {
    drafts: Drafts;
    setDrafts: (category: DraftCategory, data: UserDrafts, username?: string) => void;
    getDraft: (category: DraftCategory, id: string, username?: string) => Draft | undefined;
    removeDraft: (category: DraftCategory, id: string, username?: string) => void;
    updateDrafts: (oldUsername: string, newUsername: string) => void;
    isDraftsReady: boolean;
}

const UserDraftsContext = createContext<DraftsProps>({} as DraftsProps);

export const UserDraftsProvider = ({ children }: { children: React.ReactNode }) => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [drafts, setDrafts] = useState<Drafts>(defaultDrafts);

    const set = (category: DraftCategory, data: UserDrafts, username?: string): void => {
        const current = readDrafts();
        const index = username ?? 'Guest';
        const mergedUserDrafts: UserDrafts = {
            ...(current[category][index] ?? {}),
            ...data,
        }
        const updated: Drafts = {
            ...current,
            [category]: {
                ...current[category],
                [index]: capUserDrafts(mergedUserDrafts),
            }
        }
        writeDrafts(updated);
        setDrafts(updated);
    }

    const get = (category: DraftCategory, id: string, username?: string): Draft | undefined => {
        const index = username ?? 'Guest';
        return drafts[category]?.[index]?.[id];
    }

    const remove = (category: DraftCategory, id: string, username?: string): void => {
        const current = readDrafts();
        const index = username ?? 'Guest';
        const { [id]: _, ...rest } = current[category][index] ?? {};
        const updated: Drafts = {
            ...current,
            [category]: {
                ...current[category],
                [index]: rest,
            }
        }
        writeDrafts(updated);
        setDrafts(updated);
    }

    const update = (oldUsername: string, newUsername: string): void => {
        const current = readDrafts();
        const categories = Object.keys(current) as (keyof Drafts)[];
        const updated: Drafts = categories.reduce((acc, category) => {
            const { [oldUsername]: oldUserDrafts, ...rest } = current[category];
            return {
                ...acc,
                [category]: {
                    ...rest,
                    [newUsername]: capUserDrafts({
                        ...(rest[newUsername] ?? {}),
                        ...(oldUserDrafts ?? {})
                    }),
                }
            }
        }, current)
        writeDrafts(updated);
        setDrafts(updated);
    }

    useEffect(() => {
        storeDrafts();
        setDrafts(readDrafts());
        setIsReady(true);
    }, [])

    return (
        <UserDraftsContext.Provider value={{
            drafts,
            setDrafts: set,
            getDraft: get,
            removeDraft: remove,
            updateDrafts: update,
            isDraftsReady: isReady,
        }}>
            {children}
        </UserDraftsContext.Provider>
    )

}

export { UserDraftsContext };