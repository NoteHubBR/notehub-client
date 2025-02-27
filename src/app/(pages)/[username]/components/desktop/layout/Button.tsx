'use client';

import { clsx } from "clsx";
import { LowDetailUser } from "@/core";
import { useCallback, useState } from "react";
import { useFollowing, useServices, useUser } from "@/data/hooks";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    user: LowDetailUser;
}

export const Button = ({ user, ...rest }: ButtonProps) => {

    const { userService: { followUser, unfollowUser } } = useServices();

    const { token } = useUser();
    const { users, setNewFollowing, removeFollowing } = useFollowing();

    const isFollowing = users.some((u) => u.username === user.username);

    const [hovering, setHovering] = useState<boolean>(false);
    const [requesting, setRequesting] = useState<boolean>(false);
    const [reqFollow, setReqFollow] = useState<boolean>(false);
    const [reqUnfollow, setReqUnfollow] = useState<boolean>(false);

    const follow = useCallback(async () => {
        if (!token) return;
        setRequesting(true);
        setReqFollow(true);
        try {
            await followUser(token.access_token, user.username);
            setNewFollowing(user);
        } finally {
            setRequesting(false);
            setReqFollow(false);
        }
    }, [token])

    const unfollow = useCallback(async () => {
        if (!token) return;
        setRequesting(true);
        setReqUnfollow(true);
        try {
            await unfollowUser(token.access_token, user.username);
            removeFollowing(user);
        } finally {
            setHovering(false);
            setRequesting(false);
            setReqUnfollow(false);
        }
    }, [token])

    const HTMLButton = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLButtonElement>) => {
        return (
            <button
                className={clsx(
                    'w-28 inlg:w-24 h-[40px] py-2 flex items-center justify-center rounded-3xl text-md inlg:text-sm font-medium',
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
            onMouseLeave={() => setHovering(false)}
            onClick={() => unfollow()}
            {...rest}
        >
            Desseguir
        </HTMLButton >
    )

    if (isFollowing) return (
        <HTMLButton
            aria-label="Seguindo"
            className="dark:bg-violet-600 bg-violet-600 text-white"
            onMouseEnter={() => setHovering(true)}
            onClick={() => unfollow()}
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
            hover:text-white dark:text-white  text-neutral-700 inmd:text-black
            backdrop-blur-sm
            drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]"
            onClick={() => follow()}
            {...rest}
        >
            Seguir
        </HTMLButton>
    )

    else return null;

}