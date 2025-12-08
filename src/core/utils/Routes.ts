export enum Routes {
    BASE = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    RECOVER = '/recover',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt',
    SPONSORSHIP = '/sponsorship',
    SEARCH_DESKTOP = '/search',
    SEARCH_MOBILE = '/m/search',
    NOTIFICATIONS_MOBILE = '/m/notifications',
    USER = '/username',
    USER_NOTE = '/username/:id',
    USER_NOTES = '/username/notes',
    USER_FLAMES = '/username/flames',
    SETTINGS = '/settings',
    SETTINGS_ACCOUNT = '/settings/account',
    SETTINGS_ACCOUNT_INFO = '/settings/account/info',
    SETTINGS_ACCOUNT_VISIBILITY = '/settings/account/visibility',
    SETTINGS_ACCOUNT_EMAIL = '/settings/account/email',
    SETTINGS_ACCOUNT_PASSWORD = '/settings/account/password',
    SETTINGS_ACCOUNT_DELETE = '/settings/account/delete',
    SETTINGS_APPEARANCE = '/settings/appearance',
    SETTINGS_SPONSORSHIP = '/settings/sponsorship',
    CHANGE_EMAIL = '/change/email',
    CHANGE_PASSWORD = '/change/password',
    NEW = '/new',
    HELP = '/help',
    CHANGELOG = '/changelog'
}

enum NotUserContextRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    RECOVER = '/recover',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt',
    SPONSORSHIP = '/sponsorship',
    CHANGE_EMAIL = '/change/email',
    CHANGE_PASSWORD = '/change/password',
    HELP = '/help',
    CHANGELOG = '/changelog'
}

export const shouldUseUserContext = (pathname: string): boolean => {
    const getStaticRoute = (route: string) => { return route.split('/:')[0] }
    const ignoredRoutes = Object.values(NotUserContextRoutes).map(getStaticRoute)
    return !ignoredRoutes.some(prefix => pathname.startsWith(prefix))
}