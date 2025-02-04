export default interface Store {
    isFirstTimer: boolean;
    isGuest: boolean;
    isExpired: boolean;
    isDarkModeUser: boolean;
    isMenuOpen: boolean;
    searches: string[];
}

export function storeData() {
    if (!localStorage.getItem('store')) {
        const store = {
            isFirstTimer: true,
            isGuest: false,
            isExpired: false,
            isDarkModeUser: window.matchMedia("(prefers-color-scheme: dark)").matches,
            isMenuOpen: false,
            searches: []
        }
        localStorage.setItem('store', JSON.stringify(store));
    }
}