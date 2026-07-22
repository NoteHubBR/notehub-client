import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { User } from '@/core';
import NextImage from 'next/image';

interface ImageProps {
    user: Partial<User>;
    className?: string;
}

export const Image = forwardRef<HTMLDivElement, ImageProps>(({ user, className }, ref) => (
    <div
        role='banner'
        ref={ref}
        className={clsx(
            'overflow-hidden',
            'aspect-[3/1]',
            className
        )}
    >
        <NextImage
            src={user.banner ?? '/imgs/banner.png'}
            alt={`Capa de ${user.username ?? 'ex usuário'}`}
            fill
        />
    </div>
))

Image.displayName = 'Image';