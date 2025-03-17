import { clsx } from "clsx";
import { IconCaretUpDown } from "@tabler/icons-react";

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
                'z-[998] relative w-[188px] insm:w-[133px] p-1',
                'rounded',
                'flex items-center gap-3',
                'dark:text-neutral-400 text-neutral-600',
                'dark:bg-black bg-white',
                'hover:!text-white hover:!bg-violet-600',
                isMenuOpen && '!text-white !bg-violet-600',
                'dark:drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-[0_0_1px_rgba(0,0,0,1)]',
                'transition-all duration-200'
            )}
            {...rest}
        >
            <figure>
                {icon}
            </figure>
            <div className="flex-1 text-start flex flex-col">
                <span className="font-medium text-sm">{title}</span>
                <span className="insm:hidden font-medium text-xs">{description} </span>
            </div>
            <IconCaretUpDown
                size={20}
                className={`${isMenuOpen ? 'rotate-180' : 'rotate-0'} transition-[transform]`}
            />
            {children}
        </div>
    )
}