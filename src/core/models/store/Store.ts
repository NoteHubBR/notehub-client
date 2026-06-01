import { Event } from '../feed';
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const ActionsSchema = z.object({
    isMenuOpen: z.boolean(),
    searches: z.array(z.string()),
    filters: z.array(z.nativeEnum(Event)),
})

const StoreSchema = z.object({
    device: z.string(),
    isFirstTimer: z.boolean(),
    isGuest: z.boolean(),
    isExpired: z.boolean(),
    actions: z.record(z.string(), ActionsSchema),
})

export type Actions = z.infer<typeof ActionsSchema>;
export type Store = z.infer<typeof StoreSchema> & { device: UUID | string };

export const defaultAction: Actions = {
    isMenuOpen: false,
    searches: [],
    filters: Object.values(Event),
}

export const defaultStore: Store = {
    device: uuidv4(),
    isFirstTimer: true,
    isGuest: false,
    isExpired: false,
    actions: {
        'Guest': defaultAction,
    }
}

const mergeAction = (action: Partial<Actions>): Actions => ({
    isMenuOpen: action.isMenuOpen ?? defaultAction.isMenuOpen,
    searches: action.searches ?? defaultAction.searches,
    filters: action.filters ?? defaultAction.filters,
})

const mergeData = (data: Partial<Store>): Store => {
    const mergedActions = data.actions
        ? Object.fromEntries(
            Object.entries(data.actions).map(([key, action]) => [key, mergeAction(action)])
        )
        : defaultStore.actions;
    return {
        device: data.device ?? uuidv4(),
        isFirstTimer: data.isFirstTimer ?? true,
        isGuest: data.isGuest ?? false,
        isExpired: data.isExpired ?? false,
        actions: mergedActions,
    }
}

const storeNeedsMerge = (data: unknown): boolean => {
    return !StoreSchema.safeParse(data).success;
}

export function storeData() {
    const store = localStorage.getItem('store');
    const data = store ? JSON.parse(store) : undefined;
    if (data === undefined) return localStorage.setItem('store', JSON.stringify(defaultStore));
    if (storeNeedsMerge(data)) {
        const mergedStore = mergeData(data);
        return localStorage.setItem('store', JSON.stringify(mergedStore));
    }
    return;
}