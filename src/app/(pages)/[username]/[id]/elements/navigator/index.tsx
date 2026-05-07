import { clsx } from 'clsx';
import { IconKeyframeAlignVertical } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

export const Navigator = () => {

    const btnRef = useRef<HTMLButtonElement>(null);
    const [isCentered, setIsCentered] = useState(false);
    const [top, setTop] = useState(0);

    const scrollToNote = () => {
        const noteEl = document.getElementById('note');
        if (noteEl) noteEl.scrollIntoView({ behavior: "smooth" });
        if (btnRef.current) btnRef.current.blur();
    }

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        if (docHeight <= winHeight) return;
        const thumbHeight = (winHeight / docHeight) * winHeight;
        const scrollRatio = scrollTop / (docHeight - winHeight);
        const thumbTop = scrollRatio * (winHeight - thumbHeight);
        setTop(thumbTop + thumbHeight / 2);
    }

    const observeNote = (onIntersect: (visible: boolean) => void) => {
        let intersectionObserver: IntersectionObserver;
        const createIntersection = (el: Element) => {
            intersectionObserver = new IntersectionObserver(
                ([entry]) => onIntersect(entry.intersectionRatio === 1),
                { threshold: 1.0 }
            )
            intersectionObserver.observe(el);
        }
        const noteEl = document.getElementById('note');
        if (noteEl) {
            createIntersection(noteEl);
            return () => intersectionObserver.disconnect();
        }
        const mutationObserver = new MutationObserver(() => {
            const el = document.getElementById('note');
            if (!el) return;
            mutationObserver.disconnect();
            createIntersection(el);
        })
        mutationObserver.observe(document.body, { childList: true, subtree: true });
        return () => {
            mutationObserver.disconnect();
            intersectionObserver?.disconnect();
        }
    }

    useEffect(() => observeNote(setIsCentered), []);

    useEffect(() => {
        scrollToNote();
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div
            aria-hidden={isCentered}
            style={{ top: top - 16 }}
            className={clsx(
                'z-[10]',
                'fixed right-2',
                isCentered ? 'pointer-events-none' : 'pointer-events-auto',
            )}
        >
            <button
                ref={btnRef}
                onClick={scrollToNote}
                className={clsx(
                    'overflow-clip relative',
                    'origin-center',
                    'p-1.5 rounded-full',
                    'flex items-center justify-center',
                    '',
                    'backdrop-blur-sm',
                    'expand motion-safe:animate-expand motion-reduce:animate-none',
                    'transition-transform duration-[333ms]',
                    'active:scale-90',
                    '[@media(hover:hover)]:hover:scale-90',
                    isCentered
                        ? 'bg-primary scale-0'
                        : 'dark:bg-lighter/25 bg-darker/25 scale-100',
                )}
            >
                <IconKeyframeAlignVertical
                    size={22}
                    className="dark:text-lighter text-lighter"
                />
            </button>
        </div>
    )

}