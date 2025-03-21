import { clsx } from 'clsx';

export const Dropdown = ({ isOpen, ...rest }: { isOpen: boolean } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            role="menu"
            className={clsx(
                'z-[997] overflow-hidden absolute top-[110%] left-0',
                'w-full',   
                isOpen ? 'max-h-[180px]' : 'max-h-0',
                'rounded',
                'dark:text-neutral-400 text-neutral-600',
                'dark:bg-black bg-white',
                'hover:dark:bg-neutral-800 hover:bg-neutral-100',
                'transition-all'
            )}
            {...rest}
        />
    )
}