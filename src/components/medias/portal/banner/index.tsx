import { forwardRef } from 'react';
import { Image } from './image';
import { User } from '@/core';

interface BannerProps {
    user: Partial<User>;
    className?: string;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(({ user, className }, ref) => (
    <Image
        ref={ref}
        user={user}
        className={className}
    />
))

Banner.displayName = 'Banner';