import { clsx } from "clsx";
import { useCallback, useEffect, useRef } from "react";

interface DialogProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    msg: string;
    desc: string;
    opt: string;
    type: "button" | "submit";
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
}

export const Dialog = ({ msg, desc, opt, type, isOpen, setIsOpen, disabled, onClick, className, ...rest }: DialogProps) => {

    const Option = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button
            className={clsx(
                'py-2 flex-1',
                'font-semibold text-sm',
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
            ref={dialogRef}
            role="dialog"
            aria-labelledby="dialogTitle"
            aria-describedby="dialogDesc"
            className="z-[999] center
            overflow-hidden max-w-[333px] w-[90%] rounded
            border dark:border-middark/50 border-midlight/50
            flex flex-col
            dark:bg-semidark bg-white"
        >
            <header className="p-6 text-center flex flex-col items-center justify-center gap-3">
                <h2 id="dialogTitle" className="font-bold text-xl">{msg}</h2>
                <p id="dialogDesc" className="text-sm">{desc}</p>
            </header>
            <footer className="border-t dark:border-middark/50 border-midlight/50 flex">
                <Option
                    type="button"
                    disabled={disabled}
                    onClick={handleCancelClick}
                    className="disabled:cursor-not-allowed dark:hover:bg-black hover:bg-semilight transition-colors"
                >
                    Cancelar
                </Option>
                <div className="border-l dark:border-middark/50 border-midlight/50" />
                <Option
                    onClick={onClick}
                    type={type}
                    disabled={disabled}
                    className={`hover:!text-white disabled:!text-white transition-colors ${className}`}
                    {...rest}
                >
                    {opt}
                </Option>
            </footer>
        </div>
    )

}