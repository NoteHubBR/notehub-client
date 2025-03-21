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
                    ? 'dark:bg-[rgba(0,0,0,.5)] bg-[rgba(255,255,255,.5)] backdrop-blur'
                    : 'dark:bg-black bg-white'
            )}
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
            <h1 className="flex-1 font-semibold text-xl">{title}</h1>
            <Button ref={applyRef} {...rest} />
        </header>
    )
})

Header.displayName = 'Header';