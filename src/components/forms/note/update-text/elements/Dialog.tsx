import { clsx } from "clsx";
import { useCallback, useEffect, useRef } from "react";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    msg: string;
    desc: string;
    opt: string;
    type: "button" | "submit";
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Dialog = ({ msg, desc, opt, type, isOpen, setIsOpen, className, ...rest }: DialogProps) => {

    const Option = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button
            className={clsx(
                'py-2 flex-1',
                'font-semibold',
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
            flex flex-col
            dark:bg-semidark bg-white
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
            {...rest}
        >
            <header className="p-6 text-center flex flex-col items-center justify-center gap-3">
                <h2 id="dialogTitle" className="font-bold text-xl">{msg}</h2>
                <p id="dialogDesc" className="text-sm">{desc}</p>
            </header>
            <footer className="border-t dark:border-middark border-midlight flex">
                <Option
                    type="button"
                    onClick={handleCancelClick}
                    className="dark:hover:bg-black hover:bg-semilight transition-colors"
                >
                    Cancelar
                </Option>
                <div className="border-l dark:border-middark border-midlight" />
                <Option
                    type={type}
                    className={`dark:hover:text-white hover:text-white transition-colors ${className}`}
                >
                    {opt}
                </Option>
            </footer>
        </div>
    )

}