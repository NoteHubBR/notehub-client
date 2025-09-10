import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

export default interface Store {
    device: UUID | string;
    isFirstTimer: boolean;
    isGuest: boolean;
    isExpired: boolean;
    actions: Record<
        string, {
            isMenuOpen: boolean;
            searches: string[]
        }
    >
}

const defaultStore: Store = {
    device: uuidv4(),
    isFirstTimer: true,
    isGuest: false,
    isExpired: false,
    actions: {
        'Guest': {
            isMenuOpen: false,
            searches: []
        }
    }
}

const mergeData = (data: Partial<Store>): Store => {
    return {
        device: data.device ?? uuidv4(),
        isFirstTimer: data.isFirstTimer ?? true,
        isGuest: data.isGuest ?? false,
        isExpired: data.isExpired ?? false,
        actions: data.actions ?? {
            'Guest': {
                isMenuOpen: false,
                searches: []
            }
        }
    }
}

const keys = ['device', 'isFirstTimer', 'isGuest', 'isExpired', 'actions'] as (keyof Store)[];

const storeNeedsMerge = (data: Partial<Store>): boolean => (keys).some(k => data[k] === undefined);

export function storeData() {
    const store = localStorage.getItem('store');
    const data = store ? JSON.parse(store) as Partial<Store> : undefined;
    if (data === undefined) return localStorage.setItem('store', JSON.stringify(defaultStore));
    if (data && storeNeedsMerge(data)) {
        const mergedStore = mergeData(data);
        return localStorage.setItem('store', JSON.stringify(mergedStore));
    }
    return;
}