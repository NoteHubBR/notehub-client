import { LowDetailNote } from '@/core';

export class Filter {
    findNotes(query: string, notes: LowDetailNote[]): LowDetailNote[] {
        const words: string[] = query.toLowerCase().split(' ');
        return notes.filter((note) => {
            const status = note.closed ? 'closed' : 'open';
            const text = `
                ${note.title}
                ${note.tags.join(' ').toLowerCase()}
                ${status}
            `.toLowerCase()
            return words.every((word) => text.includes(word))
        })
    }
}