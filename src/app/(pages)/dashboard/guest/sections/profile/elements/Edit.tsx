interface EditProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ElementType;
    tooltip: string;
}

export const Edit = ({ icon: Icon, tooltip, ...rest }: EditProps) => (
    <button
        aria-label="Editar"
        className="group relative
        p-2 rounded-full
        dark:text-white text-black
        dark:bg-black bg-white
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
        {...rest}
    >
        <Icon size={20} />
        <span
            role="tooltip"
            className="pointer-events-none select-none whitespace-nowrap
            absolute left-1/2 -translate-x-1/2 inlg:-translate-x-[60%] bottom-[150%]
            p-2 rounded
            font-medium text-xs text-white
            bg-neutral-500
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300"
        >
            {tooltip}
        </span>
    </button>
)