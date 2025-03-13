import { clsx } from "clsx";
import { useCallback, useEffect, useState } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    triggerRef: React.RefObject<HTMLInputElement>;
    closeRef: React.RefObject<HTMLButtonElement>;
    applyRef: React.RefObject<HTMLButtonElement>;
}

export const Modal = ({ className, triggerRef, closeRef, applyRef, ...rest }: ModalProps) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleChangeOnTrigger = useCallback(() => {
        return setIsModalOpen(true);
    }, [])

    const handleClickOnClose = useCallback((e: MouseEvent) => {
        if (closeRef && closeRef.current?.contains(e.target as HTMLButtonElement)) {
            return setIsModalOpen(false);
        }
    }, [closeRef])

    const handleClickOnApply = useCallback((e: MouseEvent) => {
        if (applyRef && applyRef.current?.contains(e.target as HTMLButtonElement)) {
            return setIsModalOpen(false);
        }
    }, [applyRef])

    useEffect(() => {

        const trigger = triggerRef.current;

        if (trigger) trigger.addEventListener('change', handleChangeOnTrigger);
        document.addEventListener('click', handleClickOnClose);
        document.addEventListener('click', handleClickOnApply);

        return () => {
            if (trigger) trigger.removeEventListener('change', handleChangeOnTrigger);
            document.removeEventListener('click', handleClickOnClose);
            document.removeEventListener('click', handleClickOnApply);
        }

    }, [handleChangeOnTrigger, handleClickOnApply, handleClickOnClose, triggerRef])

    if (isModalOpen) return (
        <section
            className={clsx(
                'z-[999] overflow-hidden center m-auto',
                'w-full max-w-[570px] h-[666px] inmd:h-svh rounded-xl inmd:rounded-none',
                'dark:bg-black bg-white',
                className
            )}
            {...rest}
        >
            {rest.children}
        </section>
    )

}