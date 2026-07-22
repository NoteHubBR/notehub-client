import { forwardRef } from 'react';
import { Image } from './image';
import { User } from '@/core';
import { Video } from './video';

interface PhotoProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    user: Partial<User> | null;
    size?: number;
    className?: string;
}

export const Photo = forwardRef<HTMLDivElement, PhotoProps>((props, ref) => {

    const { src, user, size = 30, className, ...rest } = props;

    const mediaSrc = src
        ? src
        : user
            ? user.blocked
                ? '/imgs/avatar.png'
                : user.avatar
                    ? user.avatar
                    : '/imgs/avatar.png'
            : '/imgs/avatar.png';

    const isVideo = mediaSrc.toLowerCase().split('?')[0].endsWith('.webm');

    if (isVideo) return <Video
        ref={ref}
        src={mediaSrc}
        user={user}
        size={size}
        className={className}
    />

    return <Image
        ref={ref}
        src={mediaSrc}
        user={user}
        size={size}
        className={className}
    />

})

Photo.displayName = 'Photo';