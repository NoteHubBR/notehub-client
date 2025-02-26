import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

interface PortalProps {
    refElement: React.RefObject<HTMLElement>;
    refChild: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}

export const Portal = ({ refElement, refChild, children }: PortalProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOnRefElement = useCallback(() => {
        return setIsOpen((prev) => (!prev))
    }, [])

    const handleClickOnRefChild = useCallback((event: MouseEvent) => {
        if (refChild.current && !refChild.current.contains(event.target as Node)) {
            return setIsOpen(false);
        }
    }, [refChild])

    const handleClickKeyEsc = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') return setIsOpen(false);
    }, [])

    useEffect(() => {
        const refElmnt = refElement.current;
        if (refElmnt) refElmnt.addEventListener('click', handleClickOnRefElement);
        document.addEventListener('mousedown', handleClickOnRefChild);
        document.addEventListener('keydown', handleClickKeyEsc);
        return () => {
            if (refElmnt) refElmnt.removeEventListener('click', handleClickOnRefElement);
            document.removeEventListener('mousedown', handleClickOnRefChild);
            document.removeEventListener('mousedown', handleClickOnRefChild);
            document.removeEventListener('keydown', handleClickKeyEsc);
        }
    }, [handleClickKeyEsc, handleClickOnRefChild, handleClickOnRefElement, refChild, refElement])

    if (isOpen) return createPortal(
        <section
            className="absolute top-0 left-0
            w-screen max-w-full min-h-screen inmd:min-h-svh
            bg-[rgba(0,0,0,.9)]"
        >
            <button
                className="absolute top-[23px] left-[27px]
                p-1 rounded-full
                hover:bg-neutral-50/50 transition-colors"
            >
                <IconX size={24} color="white" />
            </button>
            {children}
        </section>,
        document.body
    )

}