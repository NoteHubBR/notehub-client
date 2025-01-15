export default interface Store {
    isFirstTimer: boolean;
    isGuest: boolean;
    isDarkModeUser: boolean;
    searches: string[];
}

export function storeData() {
    if (!localStorage.getItem('store')) {
        const store = {
            isFirstTimer: true,
            isGuest: false,
            isDarkModeUser: window.matchMedia("(prefers-color-scheme: dark)").matches,
            searches: []
        }
        localStorage.setItem('store', JSON.stringify(store));
    }
}