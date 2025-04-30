import { IconFilter } from '@tabler/icons-react';

export const Filter = ({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        aria-label="Abrir filtro"
        aria-haspopup="true"
        // aria-expanded={isOpen}
        disabled
        className="select-none cursor-pointer relative
        px-2 py-1 rounded-xl flex items-center gap-1
        border dark:border-neutral-700/50 border-dark/25
        dark:bg-dark bg-light
        hover:dark:bg-semidark hover:bg-semilight
        transition-colors"
        {...rest}
    >
        <span><IconFilter size={18} /></span>
        <span className="text-sm">Filtro</span>
        {children}
    </button>
)