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

    const handleKeydownEsc = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') return setIsOpen(false);
    }, [])

    useEffect(() => {
        const trigger = triggerRef.current;
        if (trigger) trigger.addEventListener('click', handleClickOnTrigger);
        document.addEventListener('click', handleClickOutsideDropdown);
        document.addEventListener('keydown', handleKeydownEsc);
        return () => {
            if (trigger) trigger.removeEventListener('click', handleClickOnTrigger);
            document.removeEventListener('click', handleClickOutsideDropdown);
            document.removeEventListener('keydown', handleKeydownEsc);
        }
    }, [handleClickOnTrigger, handleClickOutsideDropdown, handleKeydownEsc, triggerRef])

    const sParams = useSearchParams();
    useEffect(() => { return setIsOpen(false) }, [sParams])

    return (
        <div
            ref={dropdownRef}
            role="menu"
            aria-hidden={!isOpen}
            className={clsx(
                'cursor-default whitespace-nowrap overflow-auto scrollbar',
                'absolute right-0',
                'w-60 max-h-[333px] rounded-lg',
                isOpen ? 'visible top-[120%] !transition-all' : 'invisible top-full transition-none',
                'border dark:border-neutral-700/50 border-dark/25',
                'dark:bg-dark bg-light',
            )}
            {...rest}
        />
    )

}