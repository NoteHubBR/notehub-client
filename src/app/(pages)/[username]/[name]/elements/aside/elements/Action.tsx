interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ElementType;
    action: string | number;
}

export const Action = ({ icon: Icon, action, ...rest }: ActionProps) => (
    <span className="text-sm flex items-center gap-2">
        <button
            className="w-fit p-1 rounded-full
                text-white
                flex items-center justify-center
                dark:bg-lighter/25 bg-darker/25
                dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
                dark:hover:bg-primary hover:bg-primary
                active:scale-110
                transition-all"
            {...rest}
        >
            <Icon size={18} />
        </button>
        {action}
    </span>
)