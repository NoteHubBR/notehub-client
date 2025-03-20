import { clsx } from "clsx";
import { IconChevronUp, IconHistory } from "@tabler/icons-react";
import { useState } from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    displayName: string;
    history: string[];
}

export const Title = ({ displayName, history, ...rest }: TitleProps) => {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className="absolute bottom-2 left-36 inlg:left-32
            w-fit py-1 px-2 rounded-md
            bg-neutral-900/20
            backdrop-blur-sm"
        >
            <ul
                className={clsx(
                    'overflow-hidden',
                    'transition-all duration-300',
                    isHovering ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                )}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {history.map((username, index) => (
                    <li key={index} className="flex items-center gap-1 text-white">
                        <span><IconHistory size={15} /></span>
                        {username}
                    </li>
                ))}
            </ul>
            <h1
                className="flex items-center justify-between gap-1 font-semibold text-xl text-white"
                {...rest}
            >
                {displayName}
                {history.length > 0 &&
                    <span
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <IconChevronUp />
                    </span>
                }
            </h1>
        </div>
    )

}