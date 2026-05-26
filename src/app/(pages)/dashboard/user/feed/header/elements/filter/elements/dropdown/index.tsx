import { clsx } from 'clsx';
import { useCallback, useEffect, useRef } from 'react';

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    isDropdownOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Dropdown = ({ triggerRef, isDropdownOpen, setIsDropdownOpen, children, ...rest }: DropdownProps) => {

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleClickInsideDropdown = useCallback((e: MouseEvent): void => {
        const dropdown = dropdownRef.current;
        const target = e.target as HTMLElement;
        if (dropdown && isDropdownOpen) {
            if (dropdown.contains(target as Node)) return;
        }
        return setIsDropdownOpen(false);
    }, [isDropdownOpen, setIsDropdownOpen])

    const handleKeydown = useCallback((e: KeyboardEvent) => {
        const trigger = triggerRef.current;
        const dropdown = dropdownRef.current;
        const key = e.key;
        if (trigger && dropdown && isDropdownOpen) {
            if (key === 'Escape') {
                trigger.focus();
                setIsDropdownOpen(false);
            }
            if (key === 'Home' || key === 'End' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowDown' || key === 'ArrowRight') {
                e.preventDefault();
                const items = Array.from(dropdown.querySelectorAll<HTMLElement>('button,input'));
                if (items.length === 0) return;
                const active: HTMLElement | null = document.activeElement as HTMLElement | null;
                const currentIndex: number = active ? items.indexOf(active) : -1;
                let nextIndex: number = currentIndex;
                if (key === 'Home') nextIndex = 0;
                if (key === 'End') nextIndex = items.length - 1;
                if (key === 'ArrowUp' && currentIndex > 0) nextIndex = currentIndex - 1;
                if (key === 'ArrowLeft' && currentIndex > 0) nextIndex = currentIndex - 1;
                if (key === 'ArrowDown' && currentIndex < items.length - 1) nextIndex = currentIndex + 1;
                if (key === 'ArrowRight' && currentIndex < items.length - 1) nextIndex = currentIndex + 1;
                if ((key === 'ArrowUp' || key === 'ArrowLeft') && currentIndex === -1) nextIndex = 0;
                items[nextIndex].focus();
            }
            return;
        }
        return;
    }, [isDropdownOpen, setIsDropdownOpen, triggerRef])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('click', handleClickInsideDropdown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('click', handleClickInsideDropdown);
        }
    }, [handleClickInsideDropdown, handleKeydown])

    return (
        <div
            ref={dropdownRef}
            className={clsx(
                'z-10',
                'absolute top-[135%] right-0',
                'w-[300px] insm:w-[252px] rounded',
                'border dark:border-midlight/20 border-middark/20',
                'dark:bg-darker bg-lighter',
                'transform-gpu origin-top',
                'transition-transform duration-333 ease-out',
                isDropdownOpen
                    ? 'pointer-events-auto visible scale-100'
                    : 'pointer-events-none invisible scale-0',
            )}
            {...rest}
        >
            {children}
        </div>
    )

}