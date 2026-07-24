import { forwardRef } from 'react';
import { Image } from './image';
import { User } from '@/core';

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    user: Partial<User> | null;
    className?: string;
}

export const Banner = forwardRef<HTMLImageElement, BannerProps>((props, ref) => {

    const { src, user, className, ...rest } = props;

    const mediaSrc = src
        ? src
        : user
            ? user.blocked
                ? '/imgs/banner.png'
                : user.banner
                    ? user.banner
                    : '/imgs/banner.png'
            : '/imgs/banner.png'

    return <Image
        ref={ref}
        src={mediaSrc}
        user={user}
        className={className}
        {...rest}
    />

})

Banner.displayName = 'Banner';