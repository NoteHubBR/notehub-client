import { useCallback, useEffect, useState } from 'react';

export const usePiP = () => {

    const [isSupported, setIsSupported] = useState(false);
    const [pipWindow, setPipWindow] = useState<Window | null>(null);

    const open = useCallback(async (width = 400, height = 500) => {
        if (!isSupported) return;
        // @ts-expect-error
        const win: Window = await window.documentPictureInPicture.requestWindow({
            width,
            height,
        });
        [...document.styleSheets].forEach((sheet) => {
            try {
                const css = [...sheet.cssRules].map((r) => r.cssText).join('');
                const style = win.document.createElement('style');
                style.textContent = css;
                win.document.head.appendChild(style);
            } catch {
                if (sheet.href) {
                    const link = win.document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = sheet.href;
                    win.document.head.appendChild(link);
                }
            }
        })
        win.document.documentElement.className = document.documentElement.className;
        win.addEventListener('pagehide', () => setPipWindow(null));
        setPipWindow(win);
    }, [isSupported])

    const close = useCallback(() => {
        pipWindow?.close();
        setPipWindow(null);
    }, [pipWindow])

    useEffect(() => () => pipWindow?.close(), [pipWindow]);
    useEffect(() => setIsSupported('documentPictureInPicture' in window), []);

    return { isSupported, open, close, pipWindow };

}