import { Avatar } from './avatar';
import { Banner } from './banner';
import { forwardRef } from 'react';
import { User } from '@/core';

interface PicturePortalProps {
    user: Partial<User> | null;
    size?: number;
    fill?: boolean;
    className?: string;
}

export const PicturePortal = forwardRef<HTMLImageElement, PicturePortalProps>(({ user, size, fill, className }, ref) => {
    if (user) {
        if (size) return (
            <Avatar
                ref={ref}
                user={user}
                size={size}
                className={className}
            />
        )
        if (fill) return (
            <Banner
                ref={ref}
                user={user}
                className={className}
            />
        )
        return null;
    }
    return null;
})

PicturePortal.displayName = 'PicturePortal';