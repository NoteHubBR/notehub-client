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
                    'w-[80px] h-[30px] py-1 flex items-center justify-center rounded-3xl text-xs font-medium',
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
                'bg-lighter/15',
                'w-[80px] h-[30px] py-1 flex items-center justify-center rounded-3xl text-xs font-medium',
                'drop-shadow-alpha-d-xs',
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
            className="dark:bg-primary bg-primary text-white"
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
            className="bg-lighter/15
            hover:dark:bg-primary hover:bg-primary
            hover:text-white dark:text-white text-white inmd:text-black
            backdrop-blur-sm moz:backdrop-blur-none"
            onClick={() => follow()}
            {...rest}
        >
            Seguir
        </HTMLButton>
    )

    else return null;

}