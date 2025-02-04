export default interface Store {
    isFirstTimer: boolean;
    isGuest: boolean;
    isExpired: boolean;
    isMenuOpen: boolean;
    searches: string[];
}

export function storeData() {
    if (!localStorage.getItem('store')) {
        const store = {
            isFirstTimer: true,
            isGuest: false,
            isExpired: false,
            isMenuOpen: false,
            searches: []
        }
        localStorage.setItem('store', JSON.stringify(store));
    }
}