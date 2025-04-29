'use client';

import { clsx } from "clsx";
import { IconUserCheck, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { LowDetailUser } from "@/core";
import { useCallback, useState } from "react";
import { useFollowing, useServices, useUser } from "@/data/hooks";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    user: LowDetailUser;
}

export const Button = ({ user, ...rest }: ButtonProps) => {

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

    const HTMLButton = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLButtonElement>) => {
        return (
            <button
                className={clsx(
                    'absolute top-1 right-1',
                    'p-2 flex items-center justify-center rounded-full',
                    'font-medium text-xs',
                    'transition-colors duration-100',
                    className
                )}
                {...rest}
            />
        )
    }

    if (!current) return null;

    if (user.username === current.username) return null;

    if (requesting) return (
        <div
            role="status"
            className={clsx(
                'cursor-pointer',
                '!absolute top-1 right-1',
                reqFollow && 'applying',
                reqUnfollow && 'canceling',
                'dark:bg-lighter/30 bg-darker/30',
                'p-2 flex items-center justify-center rounded-full',
                'font-medium text-xs',
                'drop-shadow-alpha-d-xs',
                'transition-colors duration-300',
            )}
        >
            {reqFollow && <IconUserPlus size={20} />} {reqUnfollow && <IconUserMinus size={20} />}
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
            <IconUserMinus size={20} />
        </HTMLButton >
    )

    if (isFollowing) return (
        <HTMLButton
            aria-label="Seguindo"
            className="dark:bg-primary bg-primary text-white"
            onMouseEnter={() => setHovering(true)}
            onClick={() => unfollow()}
            {...rest}
        >
            <IconUserCheck size={20} />
        </HTMLButton>
    )

    if (!isFollowing) return (
        <HTMLButton
            aria-label="Seguir"
            className="dark:bg-lighter/30 bg-darker/30
            hover:dark:bg-primary hover:bg-primary
            hover:text-white dark:text-white text-white
            backdrop-blur-sm moz:backdrop-blur-none"
            onClick={() => follow()}
            {...rest}
        >
            <IconUserPlus size={20} />
        </HTMLButton>
    )

    else return null;

}