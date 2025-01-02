export enum Routes {
    BASE = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt'
};

enum NotUserContextRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SENT = '/sent',
    ACTIVATE = '/activate/:jwt'
};

export const shouldUseUserContext = (pathname: string): boolean => {
    const getStaticRoute = (route: string) => { return route.split('/:')[0] }
    const ignoredRoutes = Object.values(NotUserContextRoutes).map(getStaticRoute)
    return !ignoredRoutes.some(prefix => pathname.startsWith(prefix))
};