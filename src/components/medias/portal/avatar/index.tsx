import { forwardRef } from 'react';
import { Image } from './image';
import { User } from '@/core';
import { Video } from './video';

interface AvatarProps {
    user: Partial<User>;
    size: number;
    className?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ user, size, className }, ref) => {

    const mediaSrc = user
        ? user.blocked
            ? '/imgs/avatar.png'
            : user.avatar
                ? user.avatar
                : '/imgs/avatar.png'
        : '/imgs/avatar.png';

    const isVideo = mediaSrc.toLowerCase().split('?')[0].endsWith('.webm');

    if (isVideo) return <Video
        ref={ref}
        user={user}
        size={size}
        className={className}
    />

    return <Image
        ref={ref}
        user={user}
        size={size}
        className={className}
    />

})

Avatar.displayName = 'Avatar';