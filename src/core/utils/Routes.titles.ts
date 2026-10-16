import { Routes } from './Routes';

type Params = Record<string, string>;
type TitleResolver = string | ((params: Params) => string);

export const APP_NAME = 'NoteHub';

// '/activate/:jwt' -> /^\/activate\/(?<jwt>[^/]+)\/?$/
const compile = (pattern: string) => new RegExp(`^${pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)')}/?$`);

const TITLES: [string, TitleResolver][] = [
    [Routes.BASE, APP_NAME],
    [Routes.SIGNUP, 'Criar conta'],
    [Routes.SIGNIN, 'Entrar'],
    [Routes.RECOVER, 'Recuperar conta'],
    [Routes.SENT, 'E-mail enviado'],
    [Routes.ACTIVATE, 'Ativar conta'],
    [Routes.SPONSORSHIP, 'Apoio'],
    [Routes.SPONSORSHIP_SUCCESS, 'Obrigado'],
    [Routes.SEARCH_DESKTOP, 'Pesquisar'],
    [Routes.SEARCH_MOBILE, 'Pesquisar'],
    [Routes.NOTIFICATIONS_MOBILE, 'Notificações'],
    [Routes.SETTINGS, 'Configurações'],
    [Routes.SETTINGS_ACCOUNT, 'Configurações da conta'],
    [Routes.SETTINGS_ACCOUNT_SUBSCRIPTIONS, 'Assinaturas da conta'],
    [Routes.SETTINGS_ACCOUNT_INFO, 'Informações da conta'],
    [Routes.SETTINGS_ACCOUNT_VISIBILITY, 'Visibilidade da conta'],
    [Routes.SETTINGS_ACCOUNT_EMAIL, 'E-mail da conta'],
    [Routes.SETTINGS_ACCOUNT_PASSWORD, 'Senha da conta'],
    [Routes.SETTINGS_ACCOUNT_SESSIONS, 'Sessões da conta'],
    [Routes.SETTINGS_ACCOUNT_DELETE, 'Excluir conta'],
    [Routes.SETTINGS_APPEARANCE, 'Aparência'],
    [Routes.SETTINGS_SPONSORSHIP, 'Configurações de apoio'],
    [Routes.CHANGE_EMAIL, 'Alterar e-mail'],
    [Routes.CHANGE_PASSWORD, 'Alterar senha'],
    [Routes.NEW, 'Nova nota'],
    [Routes.HELP, 'Ajuda'],
    [Routes.CHANGELOG, 'Novidades'],
    [Routes.TERMS, 'Termos de Serviço'],
    [Routes.POLICY, 'Política de Privacidade'],
    [Routes.COOKIES, 'Política de Cookies'],
    ['/:username/notes', (p) => `Notas de ${p.username}`],
    ['/:username/flames', (p) => `Chamas de ${p.username}`],
    ['/:username/followers', (p) => `Seguidores de ${p.username}`],
    ['/:username/following', (p) => `Seguindo de ${p.username}`],
    ['/:username/:name', (p) => `Nota de ${p.username}`],
    ['/:username', (p) => p.username],
]

const COMPILED = TITLES.map(([pattern, title]) => [compile(pattern), title] as const);

export const resolveRouteTitle = (pathname: string): string => {
    for (const [regex, title] of COMPILED) {
        const match = regex.exec(pathname);
        if (!match) continue;
        return typeof title === 'function' ? title(match.groups ?? {}) : title;
    }
    return APP_NAME;
}