import { clsx } from "clsx";
import { IconMoonFilled } from "@tabler/icons-react";
import { usePref } from "@/data/hooks";

export const Theme = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const { pref: { useDarkTheme }, setPref } = usePref();

    const toggleTheme = () => setPref({ useDarkTheme: !useDarkTheme });

    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                'relative w-[36px] h-[12px] rounded-full',
                'dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md',
                'transition-colors duration-300',
                useDarkTheme ? 'bg-black/50' : 'bg-white/50'
            )}
            {...props}
        >
            <IconMoonFilled
                size={20}
                className={clsx(
                    'absolute top-1/2 -translate-y-1/2',
                    'p-[2px] rounded-full',
                    'will-change-transform',
                    'transition-all duration-300',
                    useDarkTheme
                        ? 'translate-x-[16px] bg-semidark fill-midlight/50'
                        : 'translate-x-0 bg-semilight fill-middark/50'
                )}
            />
        </button>
    )
}