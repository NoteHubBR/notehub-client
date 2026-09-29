import { z } from 'zod';

const DraftSchema = z.object({
    content: z.string(),
    savedAt: z.number(),
}).catch({ content: '', savedAt: 0 })

const UserDraftsSchema = z.record(z.string(), DraftSchema);

const DraftsSchema = z.object({
    notes: z.record(z.string(), UserDraftsSchema.catch({})).catch({}),
})

export type Draft = z.infer<typeof DraftSchema>;
export type UserDrafts = z.infer<typeof UserDraftsSchema>;
export type Drafts = z.infer<typeof DraftsSchema>;
export const defaultDrafts: Drafts = DraftsSchema.parse({});

const KEY = 'drafts';
const MAX_DRAFTS_PER_USER = 3;

export const capUserDrafts = (userDrafts: UserDrafts): UserDrafts => {
    const entries = Object.entries(userDrafts);
    if (entries.length <= MAX_DRAFTS_PER_USER) return userDrafts;
    const kept = entries
        .sort(([, a], [, b]) => b.savedAt - a.savedAt)
        .slice(0, MAX_DRAFTS_PER_USER);
    return Object.fromEntries(kept);
}

export const storeDrafts = () => {
    let data: unknown;
    try {
        const raw = localStorage.getItem(KEY);
        data = raw ? JSON.parse(raw) : undefined;
    } catch {
        data = undefined;
    }
    const result = DraftsSchema.safeParse(data ?? {});
    const next = result.success ? result.data : defaultDrafts;
    if (data !== undefined && JSON.stringify(next) === JSON.stringify(data)) return;
    try {
        localStorage.setItem(KEY, JSON.stringify(next));
    } catch { /* quota cheia ou storage indisponível */ }
}

export const readDrafts = (): Drafts => {
    try {
        const raw = localStorage.getItem(KEY);
        const result = DraftsSchema.safeParse(raw ? JSON.parse(raw) : {});
        return result.success ? result.data : defaultDrafts;
    } catch {
        return defaultDrafts;
    }
}

export const writeDrafts = (drafts: Drafts) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(drafts));
    } catch { /* quota cheia ou storage indisponível */ }
}