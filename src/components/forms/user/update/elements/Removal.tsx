import { clsx } from "clsx";
import { IconX } from "@tabler/icons-react";

interface RemovalProps extends React.InputHTMLAttributes<HTMLInputElement> {
    handleRemovalClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    isBlocked: boolean;
    currentImg: string;
}

export const Removal = ({ name, handleRemovalClick, isBlocked, currentImg, className, ...rest }: RemovalProps) => {

    const shouldHideRemoval: boolean = currentImg === null || currentImg === '/imgs/banner.png';

    if (isBlocked || shouldHideRemoval) return <></>;

    return (
        <>
            <input
                aria-label="Remover"
                id={name}
                type="button"
                className="hidden"
                onClick={handleRemovalClick}
                {...rest}
            />
            <label
                htmlFor={name}
                className={clsx(
                    'cursor-pointer',
                    'rounded-full p-2',
                    'backdrop-blur-[2px]',
                    'bg-alpha-d-md',
                    'hover:bg-alpha-d-sm transition-all',
                    className
                )}
            >
                <IconX color="white" />
            </label>
        </>
    )

}