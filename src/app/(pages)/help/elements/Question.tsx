import { clsx } from "clsx";
import { IconPlus } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

interface QuestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    hash: string;
    children: React.ReactNode;
}

export const Question = ({ hash, children, ...rest }: QuestionProps) => {

    const [isActive, setIsActive] = useState<boolean>(hash === window.location.hash);

    const updateHash = () => window.location.hash = hash;

    const handleHashChange = useCallback(() => {
        if (hash === window.location.hash) return setIsActive(true);
        else return setIsActive(false);
    }, [hash])

    useEffect(() => {
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        }
    }, [handleHashChange])

    return (
        <button
            disabled={isActive}
            onClick={updateHash}
            className={clsx(
                'group',
                'w-full h-full',
                'font-medium',
                'flex items-center justify-between',
                isActive ? 'dark:text-white text-black' : 'dark:text-midlight/50 text-middark/50',
                'hover:dark:text-white hover:text-black',
                'transition-colors'
            )}
            {...rest}
        >
            <h2 className="text-lg flex items-center gap-3">{children}</h2>
            <IconPlus
                size={24}
                className={clsx(
                    'text-primary',
                    isActive ? 'opacity-0 animate-spin' : 'opacity-100',
                    'transition-all duration-300'
                )}
            />
        </button>
    )

}