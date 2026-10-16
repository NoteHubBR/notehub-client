export enum Routes {
    BASE = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    RECOVER = '/recover',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt',
    SPONSORSHIP = '/sponsorship',
    SPONSORSHIP_SUCCESS = '/sponsorship/success',
    SEARCH_DESKTOP = '/search',
    SEARCH_MOBILE = '/m/search',
    NOTIFICATIONS_MOBILE = '/m/notifications',
    USER = '/:username',
    USER_NOTE = '/:username/:name',
    USER_NOTES = '/:username/notes',
    USER_FLAMES = '/:username/flames',
    USER_FOLLOWERS = '/:username/followers',
    USER_FOLLOWING = '/:username/following',
    NOTES_ID = '/notes/:id',
    SETTINGS = '/settings',
    SETTINGS_ACCOUNT = '/settings/account',
    SETTINGS_ACCOUNT_SUBSCRIPTIONS = '/settings/account/subscriptions',
    SETTINGS_ACCOUNT_INFO = '/settings/account/info',
    SETTINGS_ACCOUNT_VISIBILITY = '/settings/account/visibility',
    SETTINGS_ACCOUNT_EMAIL = '/settings/account/email',
    SETTINGS_ACCOUNT_PASSWORD = '/settings/account/password',
    SETTINGS_ACCOUNT_SESSIONS = '/settings/account/sessions',
    SETTINGS_ACCOUNT_DELETE = '/settings/account/delete',
    SETTINGS_APPEARANCE = '/settings/appearance',
    SETTINGS_SPONSORSHIP = '/settings/sponsorship',
    CHANGE_EMAIL = '/change/email',
    CHANGE_PASSWORD = '/change/password',
    NEW = '/new',
    HELP = '/help',
    CHANGELOG = '/changelog',
    TERMS = '/terms',
    POLICY = '/policy',
    COOKIES = '/cookies',
}

enum NotUserContextRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    RECOVER = '/recover',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt',
    CHANGE_EMAIL = '/change/email',
    CHANGE_PASSWORD = '/change/password',
    HELP = '/help',
    CHANGELOG = '/changelog',
    TERMS = '/terms',
    POLICY = '/policy',
    COOKIES = '/cookies',
}

enum NotNavbarAndSidebarRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    RECOVER = '/recover',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt',
    SPONSORSHIP = '/sponsorship',
    SPONSORSHIP_SUCCESS = '/sponsorship/success',
    CHANGE_EMAIL = '/change/email',
    CHANGE_PASSWORD = '/change/password',
    HELP = '/help',
    CHANGELOG = '/changelog',
    TERMS = '/terms',
    POLICY = '/policy',
    COOKIES = '/cookies',
}

export const shouldUseUserContext = (pathname: string): boolean => {
    const getStaticRoute = (route: string) => { return route.split('/:')[0] }
    const ignoredRoutes = Object.values(NotUserContextRoutes).map(getStaticRoute)
    return !ignoredRoutes.some(prefix => pathname.startsWith(prefix))
}

export const shouldRenderNavbarAndSidebar = (pathname: string): boolean => {
    const getStaticRoute = (route: string) => { return route.split('/:')[0] }
    const ignoredRoutes = Object.values(NotNavbarAndSidebarRoutes).map(getStaticRoute)
    return !ignoredRoutes.some(prefix => pathname.startsWith(prefix))
}