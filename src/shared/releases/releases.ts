export type ReleaseEntryType = 'sec' | 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'perf' | 'test' | 'chore';

export interface ReleaseEntry {
    type: ReleaseEntryType;
    pr: number;
    hash: string;
    desc: string;
}

export interface Release {
    version: string;
    date: string;
    title: string;
    summary: string;
    entries: ReleaseEntry[];
}

export const releases: Release[] = [
    {
        version: 'v1.5',
        date: '17/09/25 12:34',
        title: 'Setembro 17, 2025',
        summary: 'Melhorias para usuários vindos de aplicações externas.',
        entries: [
            {
                type: 'sec',
                pr: 2,
                hash: '11ce75c0f4d3cc93519daf73da4a487e48a38f0c',
                desc: 'Usuários vindos de aplicações externas podem trocar o email vinculado a conta.'
            },
            {
                type: 'feat',
                pr: 2,
                hash: '8245608e75dfcbe31b9b1a6f1203f3a0eb1a0985',
                desc: 'Liberada a exclusão de conta para usuários vindos de aplicações externas.'
            }
        ]
    }
]