'use client';

import { cloneElement, useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
    blur?: "default" | "0" | "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    triggerRef: React.RefObject<HTMLElement>;
    childRef: React.RefObject<HTMLElement>;
    closeRef?: React.RefObject<HTMLButtonElement>;
    useDefaultClose?: boolean;
}

export const Portal = ({ blur = "3xl", triggerRef, childRef, closeRef, useDefaultClose, ...rest }: PortalProps) => {

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

    const childrenWithProp = cloneElement(rest.children as React.ReactElement, {
        onPortalClose: () => setIsOpen(false)
    })

    if (isOpen) return createPortal(
        <section
            className={clsx(
                'z-[998] fixed top-0 left-0',
                'w-screen max-w-full min-h-screen inmd:min-h-svh',
                'dark:bg-alpha-d-sm bg-alpha-l-md',
                blur == "default" ? "backdrop-blur" : `backdrop-blur-${blur}`
            )}
        >
            {useDefaultClose &&
                <button
                    className="inmd:hidden
                    fixed top-[23px] right-[27px]
                    p-1 rounded-full
                    dark:text-white text-black
                    dark:hover:bg-semilight/15 hover:bg-semidark/15
                    transition-colors"
                >
                    <IconX size={24} />
                </button>
            }
            <div className="center w-full">
                {childrenWithProp}
            </div>
        </section>,
        document.body
    )

}