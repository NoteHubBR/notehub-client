export const scrollTo = (id: string): React.MouseEventHandler<HTMLAnchorElement> => (): void => {
    return sessionStorage.setItem('scrollTo', id);
}

export const setScrollTo = (id: string): void => {
    return sessionStorage.setItem('scrollTo', id);
}

export const tryScrollTo = () => {
    const id = sessionStorage.getItem('scrollTo');
    if (id) {
        sessionStorage.removeItem('scrollTo');
        const tryScroll = () => {
            const el = document.getElementById(id);
            if (el) return el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            requestAnimationFrame(tryScroll);
        }
        return tryScroll();
    }
    return;
}