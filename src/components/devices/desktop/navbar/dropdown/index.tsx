import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonRef: React.RefObject<HTMLButtonElement>;
}

export const Dropdown = ({ buttonRef, ...rest }: DropdownProps) => {

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

    const handleEscKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') setIsOpen(false);
    }, [])

    const pathname = usePathname();

    useEffect((): void => { return setIsOpen(false); }, [pathname])

    useEffect(() => {

        const refElement = buttonRef.current;
        if (refElement) refElement.addEventListener('click', handleClickOnButtonRef);

        document.addEventListener('mousedown', handleClickOutsidePortal);
        document.addEventListener('keydown', handleEscKeydown);

        const handlePosition = () => {
            if (!refElement) return;
            const rect = refElement.getBoundingClientRect();
            setPosition({
                top: rect.bottom,
                right: window.innerWidth - rect.right
            });
        }
        handlePosition();
        window.addEventListener('resize', handlePosition);

        return () => {
            if (refElement) refElement.removeEventListener('click', handleClickOnButtonRef);
            document.removeEventListener('mousedown', handleClickOutsidePortal);
            document.removeEventListener('keydown', handleEscKeydown);
            window.removeEventListener('resize', handlePosition);
        }

    }, [buttonRef, handleClickOutsidePortal, handleClickOnButtonRef, handleEscKeydown])

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