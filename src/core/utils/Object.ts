export const isEmpty = (obj: object): boolean => {
    return JSON.stringify(obj) === '{}';
}