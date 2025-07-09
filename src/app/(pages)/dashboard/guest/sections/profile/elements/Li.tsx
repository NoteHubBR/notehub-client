import { clsx } from "clsx";
import { IconCaretDown } from "@tabler/icons-react";

interface LiProps extends React.LiHTMLAttributes<HTMLLIElement> {
    icon: React.ElementType;
    tooltip: string;
    index: number;
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const Li = ({ icon: Icon, tooltip, index, active, setActive, ...rest }: LiProps) => (
    <li
        className={clsx(
            'group relative',
            'p-2 rounded-full',
            'flex items-center justify-center',
            active === index
                ? 'text-white fill-white bg-primary'
                : 'text-primary bg-white',
            'drop-shadow-alpha-d-sm',
            'transition-colors duration-300'
        )}
        {...rest}
    >
        <button
            disabled={active === index}
            onClick={() => setActive(index)}
        >
            <Icon size={30} />
        </button>
        <span
            role="tooltip"
            className="pointer-events-none select-none whitespace-nowrap
            absolute left-1/2 -translate-x-1/2 inlg:-translate-x-[60%] top-[150%]
            p-2 rounded
            font-medium text-xs text-white
            bg-neutral-500
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300"
        >
            {tooltip}
        </span>
        <span
            className={clsx(
                'pointer-events-none absolute',
                active === index
                    ? 'opacity-100 top-full left-1/2 -translate-x-1/2 rotate-0'
                    : 'opacity-0 top-0 left-1/2 -translate-x-1/2 rotate-180',
                'transition-all duration-300'
            )}
        >
            <IconCaretDown className="fill-primary text-primary animate-bounce" />
        </span>
    </li>
)