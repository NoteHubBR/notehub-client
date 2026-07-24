import { forwardRef } from 'react';
import { User } from '@/core';

interface VideoProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Partial<User>;
    size: number;
    className?: string;
}

export const Video = forwardRef<HTMLDivElement, VideoProps>(({ user, size, className }, ref) => (
    <div
        role='img'
        ref={ref}
        style={{ width: size, height: size }}
        className={`overflow-hidden m-auto ${className}`}
    >
        <video
            src={user.avatar ?? '/imgs/avatar.png'}
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-full object-cover object-center'
        />
    </div>
))

Video.displayName = 'Video';