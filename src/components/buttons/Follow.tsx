'use client';

import { clsx } from "clsx";
import { IconUserCheck, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { LowDetailUser } from "@/core";
import { useCallback, useState } from "react";
import { useFollowing, useServices, useUser } from "@/data/hooks";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    user: LowDetailUser;
    useIcon?: boolean;
    useText?: boolean;
}

export const Follow = ({ user, useIcon, useText, className, ...rest }: ButtonProps) => {

    const { userService: { followUser, unfollowUser } } = useServices();

    const { token, user: current } = useUser();
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
    }, [followUser, setNewFollowing, token, user])

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
    }, [removeFollowing, token, unfollowUser, user])

    const HTMLButton = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLButtonElement>) => (
        <button
            className={clsx(
                'w-full m-auto py-2',
                useText && useIcon
                    ? 'max-w-32 rounded-3xl text-sm font-medium'
                    : 'max-w-24 rounded-3xl text-sm font-medium',
                'flex items-center justify-center gap-1',
                'transition-colors duration-100',
                className
            )}
            {...rest}
        />
    )

    if (!current) return null;

    if (current.username === user.username) return null;

    if (requesting) return (
        <div
            role="status"
            className={clsx(
                'cursor-pointer',
                reqFollow && 'applying',
                reqUnfollow && 'canceling',
                'w-full m-auto py-2',
                useText && useIcon
                    ? 'max-w-32 rounded-3xl text-sm font-medium'
                    : 'max-w-24 rounded-3xl text-sm font-medium',
                'dark:bg-lighter/30 bg-darker/30',
                'flex items-center justify-center gap-1',
                'drop-shadow-alpha-d-xs',
                'transition-colors duration-300',
                className
            )}
        >
            {useIcon && (reqFollow && <IconUserPlus size={20} /> || reqUnfollow && <IconUserMinus size={20} />)}
            {useText && (reqFollow && 'Seguindo' || reqUnfollow && 'Desseguindo')}
        </div>
    )

    if (hovering) return (
        <HTMLButton
            aria-label="Desseguir"
            className={clsx('dark:bg-rose-600 bg-rose-600 text-white', className)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => unfollow()}
            {...rest}
        >
            {useIcon && <IconUserMinus size={20} />}
            {useText && "Desseguir"}
        </HTMLButton >
    )

    if (isFollowing) return (
        <HTMLButton
            aria-label="Seguindo"
            className={clsx('dark:bg-primary bg-primary text-white', className)}
            onMouseEnter={() => setHovering(true)}
            onClick={() => unfollow()}
            {...rest}
        >
            {useIcon && <IconUserCheck size={20} />}
            {useText && "Seguindo"}
        </HTMLButton>
    )

    if (!isFollowing) return (
        <HTMLButton
            aria-label="Seguir"
            className={clsx(
                'dark:bg-lighter/30 bg-darker/30',
                'hover:dark:bg-primary hover:bg-primary',
                'hover:text-white dark:text-white text-neutral-700 inmd:text-black',
                'backdrop-blur-sm moz:backdrop-blur-none',
                className
            )}
            onClick={() => follow()}
            {...rest}
        >
            {useIcon && <IconUserPlus size={20} />}
            {useText && "Seguir"}
        </HTMLButton>
    )

}