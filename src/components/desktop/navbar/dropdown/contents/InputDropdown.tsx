import { clsx } from "clsx";
import { useStore, useUser } from "@/data/hooks";

export const InputDropdown = ({ isOpen, ...rest }: { isOpen: boolean } & React.HTMLAttributes<HTMLDivElement>) => {
    const { searches } = useStore();
    const { user } = useUser();

    return (
        <section
            className={clsx(
                'pointer-events-none',
                'absolute top-[110%]',
                isOpen ? 'max-h-[200px] py-1 pointer-events-auto' : 'max-h-0 py-0',
                searches(user).length > 5 ? 'overflow-y-auto scrollbar' : 'overflow-y-hidden',
                'w-full rounded-lg',
                'dark:bg-neutral-800 bg-neutral-50',
                'drop-shadow-[0_0_1px_rgba(0,0,0,.33)]',
                'transition-all'
            )}
            onMouseDown={(e: React.MouseEvent) => { e.preventDefault() }}
            {...rest}
        />
    )

}