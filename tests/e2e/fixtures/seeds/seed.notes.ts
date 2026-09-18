interface SeedNote {
    author: 'usera' | 'userb' | 'userc';
    name: string;
    tags: string[],
    closed?: boolean;
    hidden?: boolean;
    flamesCount: number;
}

export const seedNotes: Record<
    'notea' | 'noteb' | 'notec' | 'cnote' | 'hnote' | 'other',
    SeedNote
> = {
    notea: {
        author: 'usera',
        name: 'notea',
        tags: ['taga'],
        flamesCount: 2,
    },
    noteb: {
        author: 'usera',
        name: 'noteb',
        tags: ['tagb'],
        flamesCount: 1,
    },
    notec: {
        author: 'usera',
        name: 'notec',
        tags: ['tagc'],
        flamesCount: 0,
    },
    cnote: {
        author: 'usera',
        name: 'cnote',
        tags: [],
        closed: true,
        flamesCount: 0,
    },
    hnote: {
        author: 'usera',
        name: 'hnote',
        tags: [],
        hidden: true,
        flamesCount: 0,
    },
    other: {
        author: 'usera',
        name: 'other',
        tags: ['other'],
        flamesCount: 0,
    },
}