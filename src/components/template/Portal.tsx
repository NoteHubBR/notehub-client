import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    triggerRef: React.RefObject<HTMLElement>;
    childRef: React.RefObject<HTMLElement>;
    closeRef?: React.RefObject<HTMLButtonElement>;
    useDefaultClose?: boolean;
}

export const Portal = ({ triggerRef, childRef, closeRef, useDefaultClose, ...rest }: PortalProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (childRef.current && !childRef.current.contains(event.target as Node)) {
            return setIsOpen(false);
        }
    }, [childRef])

    const handleClickOnTrigger = useCallback(() => {
        return setIsOpen(true);
    }, [])

    const handleClickOnClose = useCallback((e: MouseEvent) => {
        if (closeRef && closeRef.current?.contains(e.target as HTMLButtonElement)) {
            return setIsOpen(false);
        }
    }, [closeRef])

    const handleClickEscape = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') return setIsOpen(false);
    }, [])

    useEffect(() => {

        const trigger = triggerRef.current;

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleClickEscape);
        document.addEventListener('mousedown', handleClickOnClose);
        if (trigger) trigger.addEventListener('click', handleClickOnTrigger);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleClickEscape);
            document.addEventListener('mousedown', handleClickOnClose);
            if (trigger) trigger.removeEventListener('click', handleClickOnTrigger);
        }

    }, [closeRef, handleClickEscape, handleClickOnClose, handleClickOnTrigger, handleClickOutside, isOpen, triggerRef])

    useEffect(() => {
        if (isOpen) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    if (isOpen) return createPortal(
        <section
            className="z-[999] fixed top-0 left-0
            w-screen max-w-full min-h-screen inmd:min-h-svh
            bg-[rgba(0,0,0,.25)] backdrop-blur-md"
        >
            {useDefaultClose &&
                <button
                    className="fixed top-[23px] left-[27px]
                    insm:left-1/2 insm:-translate-x-1/2
                    p-1 rounded-full
                    hover:bg-neutral-50/50 transition-colors"
                >
                    <IconX size={24} color="white" />
                </button>
            }
            <div className="center w-full">
                {rest.children}
            </div>
        </section>,
        document.body
    )

}

