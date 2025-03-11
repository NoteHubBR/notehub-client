import { clsx } from "clsx";
import { IconChevronDown } from "@tabler/icons-react";

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode;
    title: string;
    description?: string;
    isMenuOpen: boolean;
    children: React.ReactNode
}

export const Select = ({ icon, title, description, isMenuOpen, children, ...rest }: SelectProps) => {
    return (
        <div
            className={clsx(
                'z-[999] relative w-[190px] insm:w-fit p-1',
                'rounded',
                'flex items-center gap-3',
                'bg-violet-600',
                'hover:!bg-indigo-600',
                'drop-shadow-[0_0_1px_rgba(0,0,0,.33)]',
                'transition-all'
            )}
            {...rest}
        >
            <figure className="text-white">
                {icon}
            </figure>
            <div className="flex-1 text-start flex flex-col">
                <span className="font-medium text-sm text-white">{title}</span>
                <span className="insm:hidden font-medium text-xs text-white">{description} </span>
            </div>
            <IconChevronDown
                size={20}
                className={`text-white ${isMenuOpen ? 'rotate-180' : 'rotate-0'} transition-all`}
            />
            {children}
        </div>
    )
}