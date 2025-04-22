import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonRef: React.RefObject<HTMLButtonElement>;
}

export const Dropdown = ({ buttonRef, ...rest }: DropdownProps) => {

    const pathname = usePathname();

    const portalRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ top: 0, right: 0 });

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOnButtonRef = useCallback(() => {
        setIsOpen((prev) => (!prev));
    }, [])

    const handleClickOutsidePortal = useCallback((event: MouseEvent) => {
        if (
            portalRef.current && !portalRef.current.contains(event.target as Node) &&
            buttonRef.current && !buttonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    }, [buttonRef])

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        const scrollingKeys = new Set([
            'ArrowUp',
            'ArrowDown',
            'PageUp',
            'PageDown',
            'Home',
            'End'
        ])
        if (event.key === 'Escape') return setIsOpen(false);
        if (isOpen && scrollingKeys.has(event.key)) return event.preventDefault();
    }, [isOpen])

    const preventScrolling = useCallback((e: WheelEvent) => {

        if (!isOpen || !portalRef.current) return;

        const isScrollableElement = (el: HTMLElement): boolean => {
            const overflowY = window.getComputedStyle(el).overflowY;
            return overflowY === 'auto' || overflowY === 'scroll';
        }

        let targetElement = e.target as HTMLElement;
        let scrollableInPortal = false;

        while (targetElement && targetElement !== portalRef.current) {
            if (isScrollableElement(targetElement)) {
                scrollableInPortal = true;
                break;
            }
            targetElement = targetElement.parentElement as HTMLElement;
        }

        if (!scrollableInPortal) e.preventDefault();

    }, [isOpen]);

    useEffect((): void => { return setIsOpen(false); }, [pathname])

    useEffect(() => {

        const refElement = buttonRef.current;
        if (refElement) refElement.addEventListener('click', handleClickOnButtonRef);

        window.addEventListener('mousedown', handleClickOutsidePortal);
        window.addEventListener('keydown', handleKeydown, { passive: false });
        window.addEventListener('wheel', preventScrolling, { passive: false });

        const handlePosition = () => {
            if (!refElement) return;
            const rect = refElement.getBoundingClientRect();
            const scrollX = window.pageXOffset;
            const scrollY = window.pageYOffset;
            setPosition({
                top: rect.bottom + scrollY,
                right: (window.innerWidth - rect.right) + scrollX
            });
        }
        handlePosition();
        window.addEventListener('resize', handlePosition);
        window.addEventListener('scroll', handlePosition);

        return () => {
            if (refElement) refElement.removeEventListener('click', handleClickOnButtonRef);
            window.removeEventListener('mousedown', handleClickOutsidePortal);
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('wheel', preventScrolling);
            window.removeEventListener('resize', handlePosition);
            window.removeEventListener('scroll', handlePosition);
        }

    }, [buttonRef, handleClickOnButtonRef, handleClickOutsidePortal, handleKeydown, preventScrolling])

    if (!isOpen) return null;

    if (buttonRef.current) return createPortal(
        <div
            ref={portalRef}
            style={{ top: position.top, right: position.right }}
            className="z-[998] absolute rounded-xl dark:bg-semidark bg-lighter drop-shadow-alpha-d-xs"
        >
            {rest.children}
        </div>,
        document.body
    )

}