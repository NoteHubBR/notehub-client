'use client';

import { clsx } from "clsx";
import { useState } from "react";

export const Button = ({ isFollowing, ...rest }: { isFollowing: boolean } & React.HTMLAttributes<HTMLButtonElement>) => {

    const [hovering, setHovering] = useState<boolean>(false);
    const toggleHovering = (): void => setHovering(!hovering);

    const [requesting, setRequesting] = useState<boolean>(false);
    const [reqFollow, setReqFollow] = useState<boolean>(false);
    const [reqUnfollow, setReqUnfollow] = useState<boolean>(false);

    const toggleStates = (state: string): void => {
        setRequesting(!requesting);
        if (state === 'setReqFollow') return setReqFollow(!reqFollow);
        if (state === 'setReqUnfollow') return setReqUnfollow(!reqUnfollow);
    }

    const HTMLButton = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLButtonElement>) => {
        return (
            <button
                className={clsx(
                    'w-28 inlg:w-24 py-2 flex items-center justify-center rounded-3xl text-md inlg:text-sm font-medium',
                    'transition-colors duration-100',
                    className
                )}
                {...rest}
            />
        )
    }

    if (requesting) return (
        <div
            role="status"
            style={{ filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .25)' }}
            className={clsx(
                'cursor-pointer',
                reqFollow && 'following',
                reqUnfollow && 'unfollowing',
                'dark:bg-neutral-50/10 bg-neutral-900/10',
                'w-28 inlg:w-24 h-[40px] flex items-center justify-center rounded-3xl text-md inlg:text-sm font-medium',
                'transition-colors duration-300',
            )}
        >
            {reqFollow && 'Seguindo'} {reqUnfollow && 'Desseguindo'}
        </div>
    )

    if (hovering) return (
        <HTMLButton
            aria-label="Desseguir"
            className="dark:bg-rose-600 bg-rose-600 text-white"
            onMouseLeave={() => toggleHovering()}
            onClick={() => toggleStates('setReqUnfollow')}
            {...rest}
        >
            Desseguir
        </HTMLButton>
    )

    if (isFollowing) return (
        <HTMLButton
            aria-label="Seguindo"
            className="dark:bg-violet-600 bg-violet-600 text-white"
            onClick={() => toggleStates('setReqUnfollow')}
            onMouseEnter={() => toggleHovering()}
            {...rest}
        >
            Seguindo
        </HTMLButton>
    )

    if (!isFollowing) return (
        <HTMLButton
            aria-label="Seguir"
            className="dark:bg-neutral-50/10 bg-neutral-900/10
            hover:dark:bg-violet-600 hover:bg-violet-600
            hover:text-white dark:text-white text-neutral-700"
            onClick={() => toggleStates('setReqFollow')}
            {...rest}
        >
            Seguir
        </HTMLButton>
    )

    else return null;

}