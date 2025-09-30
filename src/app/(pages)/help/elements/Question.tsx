import { clsx } from "clsx";
import { IconPlus } from "@tabler/icons-react";
import { setScrollTo } from "@/core";

interface QuestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    currentId: string;
    setCurrentId: React.Dispatch<React.SetStateAction<string>>;
    hash: string;
    children: React.ReactNode;
}

export const Question = ({ currentId, setCurrentId, hash, children, ...rest }: QuestionProps) => {

    const isActive: boolean = hash === currentId;

    const updateCurrentId = (): void => {
        setScrollTo(hash);
        setCurrentId(hash);
        return;
    }

    return (
        <button
            disabled={isActive}
            onClickCapture={updateCurrentId}
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