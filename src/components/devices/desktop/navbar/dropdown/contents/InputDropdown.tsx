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
                searches(user).length > 5 ? 'overflow-y-auto scrollbar-desktop' : 'overflow-y-hidden',
                'w-full rounded-lg',
                'dark:bg-semidark bg-lighter',
                'drop-shadow-alpha-d-sm',
                'transition-all'
            )}
            onMouseDown={(e: React.MouseEvent) => { e.preventDefault() }}
            {...rest}
        />
    )

}