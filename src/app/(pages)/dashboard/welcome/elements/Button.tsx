import { useStore } from "@/data/hooks";
import { clsx } from "clsx";

export const Button = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const { setStore } = useStore();

    const initAsGuest = () => { setStore({ isFirstTimer: false, isGuest: true }); }

    return (
        <button
            onClick={initAsGuest}
            className={clsx(
                'w-[300px] inmd:w-[270px] h-[40px] rounded-full',
                'flex items-center justify-center',
                'font-semibold',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                'hover:opacity-75',
                'transition-opacity',
                className
            )}
            {...rest}
        />
    )

}