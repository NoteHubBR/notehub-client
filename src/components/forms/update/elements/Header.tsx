import { forwardRef } from "react";
import { IconX } from "@tabler/icons-react";
import { Submit } from "./Submit";

export const Header = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLElement>>(({ ...rest }, ref) => {
    return (
        <header
            className="sticky top-0 left-0 z-[998] p-2 flex items-center justify-between gap-3
            dark:bg-[rgba(0,0,0,.5)] bg-[rgba(255,255,255,.5)] backdrop-blur"
            {...rest}
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
                <IconX size={20} />
            </button>
            <h1 className="flex-1 font-semibold text-lg">Editar perfil</h1>
            <Submit type="submit">Salvar</Submit>
        </header>
    )
})

Header.displayName = 'Header';