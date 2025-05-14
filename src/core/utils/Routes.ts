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
    SETTINGS = '/settings'
}

enum NotUserContextRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt'
}

export const shouldUseUserContext = (pathname: string): boolean => {
    const getStaticRoute = (route: string) => { return route.split('/:')[0] }
    const ignoredRoutes = Object.values(NotUserContextRoutes).map(getStaticRoute)
    return !ignoredRoutes.some(prefix => pathname.startsWith(prefix))
}