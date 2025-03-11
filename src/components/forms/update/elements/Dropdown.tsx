import { clsx } from 'clsx';

export const Dropdown = ({ isOpen, ...rest }: { isOpen: boolean } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            role="menu"
            className={clsx(
                'z-[999] overflow-hidden absolute top-[105%] right-0',
                'w-full',
                isOpen ? 'max-h-[180px]' : 'max-h-0',
                'dark:bg-black bg-white',
                'hover:dark:bg-neutral-900 hover:bg-neutral-100',
                'transition-all'
            )}
            {...rest}
        />
    )
}