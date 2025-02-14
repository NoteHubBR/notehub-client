export default interface Store {
    isFirstTimer: boolean;
    isGuest: boolean;
    isExpired: boolean;
    actions: Record<
        string, {
            isMenuOpen: boolean;
            searches: string[]
        }
    >
}

export function storeData() {
    if (!localStorage.getItem('store')) {
        const store = {
            isFirstTimer: true,
            isGuest: false,
            isExpired: false,
            actions: {
                'Guest': {
                    isMenuOpen: false,
                    searches: []
                }
            }
        }
        localStorage.setItem('store', JSON.stringify(store));
    }
}