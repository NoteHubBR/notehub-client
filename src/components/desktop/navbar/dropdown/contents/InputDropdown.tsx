import { clsx } from "clsx";
import { useStore, useUser } from "@/data/hooks"

export const InputDropdown = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const { searches } = useStore();
    const { user } = useUser();

    return (
        <section
            className={clsx(
                'pointer-events-none peer-focus:pointer-events-auto',
                'absolute top-[110%]',
                'max-h-0 peer-focus:max-h-[200px]',
                searches(user).length > 5 ? 'overflow-y-auto scrollbar' : 'overflow-y-hidden',
                'w-full p-0 peer-focus:py-1 rounded-lg',
                'dark:bg-neutral-800 bg-neutral-50',
                'transition-all'
            )}
            style={{ filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .2))' }}
            onMouseDown={(e: React.MouseEvent) => { e.preventDefault() }}
            {...props}
        />
    )
}