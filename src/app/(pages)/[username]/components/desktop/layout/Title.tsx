import { clsx } from "clsx";
import { Icon } from "@/components/icon";
import { IconChevronUp, IconHistory } from "@tabler/icons-react";
import { LowDetailUser, User } from "@/core";
import { useState } from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    user: User | LowDetailUser;
    history: string[];
}

export const Title = ({ user, history, ...rest }: TitleProps) => {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <ul
                className={clsx(
                    'overflow-hidden absolute bottom-11 left-36 inlg:left-32 ',
                    isHovering ? 'max-h-72 opacity-100' : 'max-h-0 p-0 opacity-0',
                    'py-1 px-2 mb-1 rounded-md',
                    'bg-dark/10 backdrop-blur-sm',
                    'transition-all duration-300'
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
                className={clsx(
                    'absolute bottom-2 left-36 inlg:left-32',
                    'w-fit py-1 px-2 rounded-md',
                    'flex items-center justify-between gap-2',
                    'font-semibold text-xl text-white',
                    'bg-dark/10 backdrop-blur-sm',
                )}
                {...rest}
            >

                <Icon.Sponsor isSponsor={user.sponsor} size={25} />
                {user.display_name}
                {history.length > 0 &&
                    <span
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <IconChevronUp size={18} />
                    </span>
                }
            </h1>
        </>

    )

}