import { clsx } from "clsx";
import { forwardRef } from "react";
import { IconSettings } from "@tabler/icons-react";

export const Settings = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
    <button
        ref={ref}
        className={clsx(
            'group relative p-1 rounded-full',
            'dark:hover:bg-semilight/15 hover:bg-semidark/15',
            'dark:focus:bg-semilight/15 focus:bg-semidark/15',
            'transition-colors',
        )}
        {...props}
    >
        <span
            role="tooltip"
            className="pointer-events-none select-none whitespace-nowrap
                absolute left-1/2 -translate-x-1/2 inmd:-translate-x-[60%] top-[150%]
                p-2 rounded-full
                font-medium text-xs text-white
                bg-neutral-500
                opacity-0
                group-hover:opacity-100
                group-focus:opacity-0
                transition-opacity"
        >
            Configurar
        </span>
        <IconSettings size={22} />
    </button >
))

Settings.displayName = 'Settings';