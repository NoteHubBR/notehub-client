import { Button } from "./Button";
import { forwardRef } from "react";

interface HeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    title: string;
    applyRef?: React.RefObject<HTMLButtonElement>;
}

export const Header = forwardRef<HTMLButtonElement, HeaderProps>(({ icon, title, applyRef, ...rest }, ref) => {
    return (
        <header
            className="sticky top-0 left-0 z-[998] p-2 flex items-center justify-between gap-3
            dark:bg-[rgba(0,0,0,.5)] bg-[rgba(255,255,255,.5)] backdrop-blur"
        >
            <button
                aria-label="Voltar"
                ref={ref}
                type="button"
                className="p-2 rounded-full
                drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]
                hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10
                transition-colors"
            >
                {icon}
            </button>
            <h1 className="flex-1 font-semibold text-lg">{title}</h1>
            <Button ref={applyRef} {...rest} />
        </header>
    )
})

Header.displayName = 'Header';