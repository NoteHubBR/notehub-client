import { Flame, LowDetailNote, LowDetailUser, Page } from '@/core';

const PAGE_SIZE = 20;

interface LocalQuerySpec<T, O extends string> {
    defaultOrder: O;
    orders: Record<O, (a: T, b: T) => number>;
    searchText: (item: T) => string;
    types?: Record<string, (item: T) => boolean>;
    tag?: (item: T, tag: string) => boolean;
    tiebreak?: (a: T, b: T) => number;
    size?: number;
}

const has = (obj: object, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

const normalizeQuery = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const parseDate = (value: string): number => {
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4}) (\d{1,2}):(\d{2})$/);
    if (!match) return 0;
    const [, d, m, y, h, min] = match.map(Number);
    const year = y < 100 ? 2000 + y : y;
    return new Date(year, m - 1, d, h, min).getTime();
}

const compareText = (a: string, b: string) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });

export const NOTES_QUERY: LocalQuerySpec<LowDetailNote, 'modifiedAt' | 'createdAt' | 'name' | 'flamesCount' | 'commentsCount'> = {
    defaultOrder: 'modifiedAt',
    orders: {
        modifiedAt: (a, b) => parseDate(a.modified_at) - parseDate(b.modified_at),
        createdAt: (a, b) => parseDate(a.created_at) - parseDate(b.created_at),
        name: (a, b) => compareText(a.name, b.name),
        flamesCount: (a, b) => a.flames_count - b.flames_count,
        commentsCount: (a, b) => a.comments_count - b.comments_count,
    },
    searchText: (n) => `${n.name} ${n.description} ${n.tags.join(' ')}`,
    types: {
        open: (n) => !n.closed,
        closed: (n) => n.closed,
        encrypted: (n) => n.encrypted,
        hidden: (n) => n.hidden,
    },
    tag: (n, tag) => n.tags.includes(tag),
    tiebreak: (a, b) => parseDate(b.created_at) - parseDate(a.created_at),
}

export const FLAMES_QUERY: LocalQuerySpec<Flame, 'createdAt'> = {
    defaultOrder: 'createdAt',
    orders: {
        createdAt: (a, b) => parseDate(a.created_at) - parseDate(b.created_at),
    },
    searchText: (f) => `${f.note.name} ${f.note.description} ${f.note.tags.join(' ')}`,
}

export const FOLLOWING_QUERY: LocalQuerySpec<LowDetailUser, 'followersCount' | 'username'> = {
    defaultOrder: 'followersCount',
    orders: {
        followersCount: (a, b) => a.followers_count - b.followers_count,
        username: (a, b) => compareText(a.username, b.username),
    },
    searchText: (u) => `${u.username} ${u.display_name}`,
    tiebreak: (a, b) => compareText(a.username, b.username),
}

export const queryLocal = <T, O extends string>(
    spec: LocalQuerySpec<T, O>,
    items: T[],
    sp: URLSearchParams,
): Page<T> => {

    const size = spec.size ?? PAGE_SIZE;
    const q = normalizeQuery(sp.get('q')?.trim() ?? '');

    const rawOrder = sp.get('order');
    const order = rawOrder !== null && has(spec.orders, rawOrder) ? (rawOrder as O) : spec.defaultOrder;
    const compare = spec.orders[order];
    const dir = sp.get('sort') === 'asc' ? 1 : -1;

    const rawType = sp.get('type');
    const typeFn = rawType !== null && spec.types && has(spec.types, rawType) ? spec.types[rawType] : null;
    const tag = sp.get('tag');

    const rawPage = Number(sp.get('page'));
    const page = Number.isInteger(rawPage) && rawPage > 1 ? rawPage - 1 : 0;

    const filtered = items
        .filter((i) => !typeFn || typeFn(i))
        .filter((i) => !tag || !spec.tag || spec.tag(i, tag))
        .filter((i) => !q || normalizeQuery(spec.searchText(i)).includes(q))
        .sort((a, b) => dir * compare(a, b) || (spec.tiebreak?.(a, b) ?? 0));

    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = page * size;

    return {
        content: filtered.slice(start, start + size),
        totalElements,
        totalPages,
        size,
        page,
        first: page === 0,
        last: page >= totalPages - 1,
    }

}

export const buildQueryStrings = (
    searchParams: URLSearchParams,
    defaultOrderField: string = 'modifiedAt',
    keys: string[] = ['q', 'type', 'tag', 'order', 'sort', 'page']
): string => {

    const params: Record<string, string> = {};

    keys.forEach(key => {
        const value = searchParams.get(key);
        if (value) params[key] = value;
    })

    const searchQuery = new URLSearchParams();
    if (params.q) searchQuery.set('q', params.q);
    if (params.type) searchQuery.set('type', params.type);
    if (params.tag) searchQuery.set('tag', params.tag);
    if (params.order) searchQuery.set('sort', `${params.order},${params.sort ?? 'desc'}`);
    if (params.sort) searchQuery.set('sort', `${params.order ?? defaultOrderField},${params.sort}`);
    if (params.page) searchQuery.set('page', String(Number(params.page) - 1));
    if (params.type === "users" && params.order === "relevant") searchQuery.set('sort', 'followersCount,desc');
    if (params.type === "notes" && params.order === "relevant") searchQuery.set('sort', 'flamesCount,desc');
    if (params.type === "tags" && params.order === "relevant") searchQuery.set('sort', 'flamesCount,desc');
    if (params.type === undefined && params.order === "relevant") searchQuery.set('sort', 'flamesCount,desc');

    return String(searchQuery);

}