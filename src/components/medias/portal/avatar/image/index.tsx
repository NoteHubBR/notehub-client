import { forwardRef } from 'react';
import { User } from '@/core';
import NextImage from 'next/image';

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Partial<User>;
    size: number;
    className?: string;
}

export const Image = forwardRef<HTMLDivElement, ImageProps>(({ user, size, className }, ref) => (
    <div
        role='img'
        ref={ref}
        style={{ width: size, height: size }}
        className={`overflow-hidden m-auto ${className}`}
    >
        <NextImage
            src={user.avatar ?? '/imgs/avatar.png'}
            alt={`Avatar de ${user.username ?? 'ex usuário'}`}
            width={size}
            height={size}
            className='w-full h-full object-cover object-center'
        />
    </div>
))

Image.displayName = 'Image';