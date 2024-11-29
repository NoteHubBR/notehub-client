export enum Routes {
    BASE = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SENT = '/sent',
};

enum NotUserUserContextRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SENT = '/sent',
}

export const shouldUseUserContext = (pathname: string): boolean => {
    return !Object.values(NotUserUserContextRoutes).includes(pathname as NotUserUserContextRoutes)
};