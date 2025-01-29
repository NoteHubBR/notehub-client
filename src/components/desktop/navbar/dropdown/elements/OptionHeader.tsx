import { IconArrowLeft } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

interface OptionHeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    title: string;
}

export const OptionHeader = ({ title, onClick, ...rest }: OptionHeaderProps) => {

    return (
        <header className='py-2 px-3 flex items-center gap-3' {...rest}>
            <button
                className='p-1 rounded-full hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10 transition-colors'
                onClick={onClick}
            >
                <IconArrowLeft />
            </button>
            <h1 className='text-md'>{title}</h1>
        </header>
    )

}