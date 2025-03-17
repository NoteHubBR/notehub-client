import { clsx } from "clsx";
import { useCallback, useEffect, useState } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    triggerRef: React.RefObject<HTMLInputElement>;
    closeRef: React.RefObject<HTMLButtonElement>;
    applyRef: React.RefObject<HTMLButtonElement>;
    onOpen: () => void;
    onClose: () => void;
}

export const Modal = ({ className, triggerRef, closeRef, applyRef, onOpen, onClose, ...rest }: ModalProps) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = useCallback((): void => {
        onOpen();
        return setIsModalOpen(true);
    }, [onOpen])

    const handleCloseModal = useCallback((): void => {
        onClose();
        return setIsModalOpen(false);
    }, [onClose])

    const handleChangeOnTrigger = useCallback((): void => {
        return handleOpenModal();
    }, [handleOpenModal])

    const handleClickOnClose = useCallback((e: MouseEvent): void => {
        if (closeRef && closeRef.current?.contains(e.target as HTMLButtonElement)) {
            return handleCloseModal();
        }
    }, [closeRef, handleCloseModal])

    const handleClickOnApply = useCallback((e: MouseEvent): void => {
        if (applyRef && applyRef.current?.contains(e.target as HTMLButtonElement)) {
            return handleCloseModal();
        }
    }, [applyRef, handleCloseModal])

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
                'z-[999] !visible overflow-hidden fixed inset-0 m-auto',
                'w-full max-w-[555px] h-[666px] inmd:h-svh rounded-xl inmd:rounded-none',
                'dark:bg-black bg-white',
                className
            )}
            {...rest}
        >
            {rest.children}
        </section>
    )

}