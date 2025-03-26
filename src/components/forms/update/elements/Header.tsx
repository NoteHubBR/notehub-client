import { Button } from "./Button";
import { clsx } from "clsx";
import { forwardRef } from "react";

interface HeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    title: string;
    applyRef?: React.RefObject<HTMLButtonElement>;
    useBlur?: boolean;
}

export const Header = forwardRef<HTMLButtonElement, HeaderProps>(({ icon, title, applyRef, useBlur, ...rest }, ref) => {
    return (
        <header
            className={clsx(
                'sticky top-0 left-0 z-[997] p-2 pr-4 flex items-center justify-between gap-6',
                useBlur
                    ? 'dark:bg-alpha-d-md bg-alpha-l-md backdrop-blur'
                    : 'dark:bg-black bg-white'
            )}
        >
            <button
                aria-label="Voltar"
                ref={ref}
                type="button"
                className="p-2 rounded-full
                drop-shadow-alpha-d-sm
                hover:dark:bg-lighter/10 hover:bg-dark/10
                transition-colors"
            >
                {icon}
            </button>
            <h1 className="flex-1 font-semibold text-xl">{title}</h1>
            <Button ref={applyRef} {...rest} />
        </header>
    )
})

Header.displayName = 'Header';