import { LowDetailNote, Page } from "@/core";

const PAGE_SIZE = 20;
const TYPES = ['open', 'closed', 'encrypted', 'hidden'] as const;
const ORDERS = ['modifiedAt', 'createdAt', 'name', 'flamesCount', 'commentsCount'] as const;

type NoteType = typeof TYPES[number];
type NoteOrder = typeof ORDERS[number];

interface NoteParams {
    q: string;
    type: NoteType | null;
    tag: string | null;
    order: NoteOrder;
    sort: 'asc' | 'desc';
    page: number;
}

const TYPE_PREDICATE: Record<NoteType, (n: LowDetailNote) => boolean> = {
    open: (n) => !n.closed,
    closed: (n) => n.closed,
    encrypted: (n) => n.encrypted,
    hidden: (n) => n.hidden,
}

const ORDER_FIELD = {
    modifiedAt: 'modified_at',
    createdAt: 'created_at',
    name: 'name',
    flamesCount: 'flames_count',
    commentsCount: 'comments_count',
} as const satisfies Record<NoteOrder, keyof LowDetailNote>;

export const parseNoteParams = (sp: URLSearchParams): NoteParams => {
    const pick = <T extends string>(value: string | null, allowed: readonly T[]): T | null => allowed.includes(value as T) ? (value as T) : null;
    const page = Number(sp.get('page'));
    return {
        q: sp.get('q')?.trim() ?? '',
        type: pick(sp.get('type'), TYPES),
        tag: sp.get('tag'),
        order: pick(sp.get('order'), ORDERS) ?? 'modifiedAt',
        sort: sp.get('sort') === 'asc' ? 'asc' : 'desc',
        page: Number.isInteger(page) && page > 1 ? page - 1 : 0,
    }
}

const normalizeQuery = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const parseDate = (value: string): number => {
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4}) (\d{1,2}):(\d{2})$/);
    if (!match) return 0;
    const [, d, m, y, h, min] = match.map(Number);
    const year = y < 100 ? 2000 + y : y;
    return new Date(year, m - 1, d, h, min).getTime();
}

const compare = (a: LowDetailNote, b: LowDetailNote, field: keyof LowDetailNote): number => {
    const DATE_FIELDS = new Set<keyof LowDetailNote>(['created_at', 'modified_at']);
    if (field === 'name') return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
    if (DATE_FIELDS.has(field)) return parseDate(a[field] as string) - parseDate(b[field] as string);
    return (a[field] as number) - (b[field] as number);
}

export const queryLocalNotes = (
    notes: LowDetailNote[],
    params: NoteParams,
    size: number = PAGE_SIZE
): Page<LowDetailNote> => {

    const q = normalizeQuery(params.q);
    const field = ORDER_FIELD[params.order];
    const dir = params.sort === 'asc' ? 1 : -1;
    const typeFn = params.type ? TYPE_PREDICATE[params.type] : null;

    const filtered = notes
        .filter((n) => !typeFn || typeFn(n))
        .filter((n) => !params.tag || n.tags.includes(params.tag))
        .filter((n) => !q || normalizeQuery(`${n.name} ${n.description} ${n.tags.join(' ')}`).includes(q))
        .sort((a, b) => dir * compare(a, b, field) || compare(b, a, 'created_at'));

    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = params.page * size;

    return {
        content: filtered.slice(start, start + size),
        totalElements,
        totalPages,
        size,
        page: params.page,
        first: params.page === 0,
        last: params.page >= totalPages - 1,
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