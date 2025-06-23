import { clsx } from "clsx";
import { useCallback, useEffect, useRef } from "react";

interface DialogProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
}

export const Dialog = ({ isOpen, setIsOpen, disabled, onClick, ...rest }: DialogProps) => {

    const Option = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button
            disabled={disabled}
            type="button"
            className={clsx(
                'disabled:cursor-wait',
                'w-fit p-2 rounded-full',
                'font-medium text-sm',
                'dark:text-secondary text-primary dark:hover:secondary/20 hover:bg-primary/20',
                'transition-colors',
                className
            )}
            {...rest}
        />
    )

    const dialogRef = useRef<HTMLDivElement>(null);

    const handleCancelClick = () => setIsOpen(false);

    const handleClickOutsideRef = useCallback((e: MouseEvent) => {
        const el = dialogRef.current;
        if (!el) return;
        if (!el.contains(e.target as Node)) return setIsOpen(false);
    }, [setIsOpen])

    const handleEscKeydown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") return setIsOpen(false);
    }, [setIsOpen])

    useEffect(() => {
        window.addEventListener("keydown", handleEscKeydown);
        window.addEventListener("click", handleClickOutsideRef);
        return () => {
            window.removeEventListener("keydown", handleEscKeydown);
            window.removeEventListener("click", handleClickOutsideRef);
        }
    }, [isOpen, handleClickOutsideRef, handleEscKeydown])

    if (isOpen) return (
        <div
            className="z-[999]
            fixed top-0 left-0
            max-w-full w-screen h-screen inmd:h-svh
            flex items-center justify-center
            dark:bg-alpha-d-lg bg-alpha-l-lg"
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-labelledby="dialogTitle"
                aria-describedby="dialogDesc"
                className="overflow-hidden max-w-[333px] w-[90%] py-6 rounded-lg
                flex flex-col gap-6
                border dark:border-middark/50 border-midlight/50
                dark:bg-semidark bg-white"
            >
                <header className="px-6 flex flex-col justify-center gap-3">
                    <h2 id="dialogTitle" className="font-bold text-md">Excluir comentário</h2>
                    <p id="dialogDesc" className="text-sm">Excluir seu comentário permanentemente?</p>
                </header>
                <footer className="px-6 flex items-center justify-end gap-3">
                    <Option
                        onClick={handleCancelClick}
                    >
                        Cancelar
                    </Option>
                    <Option
                        onClick={onClick}
                        {...rest}
                    >
                        Excluir
                    </Option>
                </footer>
            </div>
        </div>
    )

}