import Cookie from "js-cookie";

const toDate = (string: string): Date => {

    const [datePart, timePart] = string.split(' ');

    const [day, month, year] = datePart.split('/').map(Number);

    const [hour, minute] = timePart.split(':').map(Number);

    return new Date(Date.UTC(year + 2000, month - 1, day, hour, minute));

}

const set = (name: string, value: string, expiresAt: string): string | undefined => {
    return Cookie.set(
        name,
        value,
        {
            path: '/',
            expires: toDate(expiresAt),
            sameSite: "Strict",
            secure: true
        }
    )
}

const get = (name: string): string | undefined => {
    return Cookie.get(name);
}

const remove = (name: string): void => {
    return Cookie.remove(name)
}

export const Cookies = { set, get, remove }