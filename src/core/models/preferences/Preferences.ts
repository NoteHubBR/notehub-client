export default interface Preferences {
    useDarkTheme: boolean;
}

export function storePref() {
    if (!localStorage.getItem('preferences')) {
        const pref: Preferences = {
            useDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        localStorage.setItem('preferences', JSON.stringify(pref));
    }
}