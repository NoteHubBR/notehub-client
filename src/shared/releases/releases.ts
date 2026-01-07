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
        version: 'v2.0.2',
        date: '5/1/26 10:35',
        title: 'Janeiro 5, 2026',
        summary: 'Proteção contra DDoS',
        entries: [
            {
                type: 'sec',
                pr: 12,
                hash: '1465edae93f75675eb6e9892c47305b6244b9b85',
                desc: 'Implementada proteção contra ataques DDoS por meio de rate limiting baseado em IP, aumentando a resiliência da aplicação contra requisições excessivas.'
            }
        ]
    },
    {
        version: 'v2.0.1',
        date: '17/12/25 11:24',
        title: '17 de Dezembro de 2025',
        summary: 'Correção de segurança e restrição de cosméticos.',
        entries: [
            {
                type: 'fix',
                pr: 10,
                hash: '19d3b3446a3a9803742be8330b36530dd3c912bc',
                desc: 'Corrigida vulnerabilidade na API que permitia o uso de avatares animados (.gif) por usuários sem assinatura de patrocinador'
            }
        ]
    },
    {
        version: 'v2.0',
        date: '12/12/25 14:11',
        title: 'Dezembro 12, 2025',
        summary: 'Doação via Stripe',
        entries: [
            {
                type: 'feat',
                pr: 9,
                hash: '8ff970d89f8c453fef9ae20d3b526efd8cbced34',
                desc: 'Adicionado sistema de doação via Stripe.'
            }
        ]
    },
    {
        version: 'v1.7',
        date: '8/10/25 14:45',
        title: 'Outubro 8, 2025',
        summary: 'Inscrições de usuários e notificações por e-mail baseadas em tópicos',
        entries: [
            {
                type: 'feat',
                pr: 5,
                hash: '2c76f18eec1aa1871a7a61998d393f9520f620cb',
                desc: 'Adicionada coleção de inscrições aos usuários.'
            },
            {
                type: 'feat',
                pr: 5,
                hash: '2c76f18eec1aa1871a7a61998d393f9520f620cb',
                desc: 'Implementado suporte para ativar ou remover inscrições de tópicos.'
            }
        ]
    },
    {
        version: 'v1.6.1',
        date: '29/09/25 10:56',
        title: 'Setembro 29, 2025',
        summary: 'Suporte a nomes de usuários no estilo GitHub com hífen',
        entries: [
            {
                type: 'fix',
                pr: 4,
                hash: '3e4ce2bc9ce9d2ea8fce92bcf0af8e5225ac05b8',
                desc: 'Permitido hífen na atualização de nome de usuário.'
            }
        ]
    },
    {
        version: 'v1.6',
        date: '26/09/25 14:00',
        title: 'Setembro 26, 2025',
        summary: 'Melhorias na segurança de imagem e no suporte ao perfil.',
        entries: [
            {
                type: 'feat',
                pr: 3,
                hash: 'aabd422c07ca4c839d2696ebb525417df9744c4d',
                desc: 'Permitido a remoção da capa do perfil.'
            },
            {
                type: 'feat',
                pr: 3,
                hash: 'bc1678ec66c91e6747673a625331f1a4253210c8',
                desc: 'Implementado bloqueio para usuários que enviarem imagens impróprias. Usuários bloqueados não podem atualizar as imagens do perfil.'
            }
        ]
    },
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