'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { User } from '@/core';

interface VideoProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    user: Partial<User> | null;
    size?: number;
    className?: string;
}

export const Video = forwardRef<HTMLDivElement, VideoProps>((props, ref) => {

    const { src, user, size = 30, className, ...rest } = props;

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) video.play().catch(() => { });
                else video.pause();
            },
            {
                threshold: 0.25,
            }
        )
        observer.observe(video);
        return () => observer.disconnect();
    }, [])

    return (
        <div
            role='img'
            aria-label={`Avatar de ${user && user.username ? user.username : 'ex usuário'}`}
            ref={ref}
            style={{ width: size, height: size }}
            className={`select-none overflow-hidden flex-none rounded-full ${className}`}
            {...rest}
        >
            <video
                ref={videoRef}
                src={src}
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center dark:bg-darker bg-lighter"
            />
        </div>
    )

})

Video.displayName = 'Video';