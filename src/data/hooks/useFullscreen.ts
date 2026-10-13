import { useCallback, useEffect, useRef, useState } from 'react';

export const useFullscreen = <T extends HTMLElement = HTMLElement>() => {

    const ref = useRef<T>(null);
    const [isSupported, setIsSupported] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const enter = useCallback(async () => {
        const el = ref.current;
        if (!el || el.ownerDocument !== document) return;
        try {
            await el.requestFullscreen();
        } catch { }
    }, [])

    const exit = useCallback(async () => {
        if (!document.fullscreenElement) return;
        try {
            await document.exitFullscreen();
        } catch { }
    }, [])

    const toggle = useCallback(() => (document.fullscreenElement ? exit() : enter()), [enter, exit]);

    const onChange = useCallback(() => setIsFullscreen(!!ref.current && document.fullscreenElement === ref.current), []);

    useEffect(() => {
        setIsSupported(document.fullscreenEnabled);
        document.addEventListener('fullscreenchange', onChange);
        return () => document.removeEventListener('fullscreenchange', onChange);
    }, [])

    return { ref, isSupported, isFullscreen, enter, exit, toggle };

}