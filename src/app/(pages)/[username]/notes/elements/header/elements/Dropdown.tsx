import { clsx } from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    triggerRef: React.RefObject<HTMLButtonElement>;
    closeRef: React.RefObject<HTMLSpanElement>;
}

export const Dropdown = ({ triggerRef, closeRef, ...rest }: DropdownProps) => {

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOnTrigger = useCallback((event: MouseEvent) => {
        if (closeRef.current && closeRef.current.contains(event.target as Node)) {
            return setIsOpen(false);
        }
        else if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
            return setIsOpen(true);
        }
        else return setIsOpen((prev) => (!prev));
    }, [closeRef])

    const handleClickOutsideDropdown = useCallback((event: MouseEvent) => {
        if (
            triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
            dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
        ) {
            return setIsOpen(false);
        }
    }, [triggerRef])

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

    const preventScrolling = useCallback((e: WheelEvent | TouchEvent) => {

        if (!isOpen || !dropdownRef.current) return;

        const isScrollableElement = (el: HTMLElement): boolean => {
            const overflowY = window.getComputedStyle(el).overflowY;
            const canOverflow = overflowY === 'auto' || overflowY === 'scroll';
            return canOverflow && el.scrollHeight > el.clientHeight;
        }

        let targetElement = e.target as HTMLElement;
        let scrollableInPortal = false;

        while (targetElement) {
            if (isScrollableElement(targetElement)) {
                scrollableInPortal = true;
                break;
            }
            targetElement = targetElement.parentElement as HTMLElement;
        }

        if (!scrollableInPortal) e.preventDefault();

    }, [isOpen]);

    useEffect(() => {

        const trigger = triggerRef.current;
        if (trigger) trigger.addEventListener('click', handleClickOnTrigger);

        window.addEventListener('click', handleClickOutsideDropdown);
        window.addEventListener('keydown', handleKeydown, { passive: false });
        window.addEventListener('wheel', preventScrolling, { passive: false });
        window.addEventListener('touchmove', preventScrolling, { passive: false });

        return () => {
            if (trigger) trigger.removeEventListener('click', handleClickOnTrigger);
            window.removeEventListener('click', handleClickOutsideDropdown);
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('wheel', preventScrolling);
            window.removeEventListener('touchmove', preventScrolling);
        }

    }, [handleClickOnTrigger, handleClickOutsideDropdown, handleKeydown, preventScrolling, triggerRef])

    const sParams = useSearchParams();
    useEffect(() => { return setIsOpen(false) }, [sParams])

    return (
        <>
            <div
                className={clsx(
                    isOpen ? 'hidden insm:block' : 'hidden',
                    'z-[998] cursor-default fixed top-0 left-0',
                    'w-screen max-w-full min-h-screen inmd:min-h-svh',
                    'dark:bg-alpha-d-sm bg-alpha-l-xl backdrop-blur-sm'
                )}
            />
            <div
                ref={dropdownRef}
                role="menu"
                aria-hidden={!isOpen}
                className={clsx(
                    'z-[999] cursor-default whitespace-nowrap',
                    'overflow-auto overscroll-contain scrollbar-desktop inmd:scrollbar-mobile',
                    'absolute right-0 inmd:right-auto inmd:left-0 insm:center insm:!fixed',
                    'w-60 max-h-[333px] rounded-lg',
                    isOpen ? 'visible top-[120%] !transition-all' : 'invisible top-full transition-none',
                    'border dark:border-neutral-700/50 border-dark/25',
                    'dark:bg-dark bg-light',
                )}
                {...rest}
            />
        </>
    )

}