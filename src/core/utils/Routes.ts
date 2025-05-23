export enum Routes {
    BASE = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt',
    SEARCH = '/search',
    MOBILE_SEARCH = '/m/search',
    MOBILE_NOTIFICATIONS = '/m/notifications',
    USERNAME = '/username',
    NOTES = '/username/notes',
    FLAMES = '/username/flames',
    SETTINGS = '/settings',
    ACCOUNT = '/settings/account',
    ACCOUNT_INFO = '/settings/account/info',
    ACCOUNT_VISIBILITY = '/settings/account/visibility',
    ACCOUNT_EMAIL = '/settings/account/email',
    ACCOUNT_PASSWORD = '/settings/account/password',
    ACCOUNT_DELETE = '/settings/account/delete',
    APPEARANCE = '/settings/appearance',
    SPONSORSHIP = '/settings/sponsorship',
    CHANGE_EMAIL = '/change/email',
    CHANGE_PASSWORD = '/change/password',
    HELP = '/help'
}

enum NotUserContextRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt',
    CHANGE_EMAIL = '/change/email',
    CHANGE_PASSWORD = '/change/password',
    HELP = '/help'
}

export const shouldUseUserContext = (pathname: string): boolean => {
    const getStaticRoute = (route: string) => { return route.split('/:')[0] }
    const ignoredRoutes = Object.values(NotUserContextRoutes).map(getStaticRoute)
    return !ignoredRoutes.some(prefix => pathname.startsWith(prefix))
}