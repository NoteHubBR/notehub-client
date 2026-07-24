import { forwardRef } from 'react';
import { User } from '@/core';
import NextImage from 'next/image';

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    user: Partial<User> | null;
    size?: number;
    className?: string;
}

export const Image = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {

    const { src, user, size = 30, className, ...rest } = props;

    return (
        <div
            role='img'
            aria-label={`Avatar de ${user && user.username ? user.username : 'ex usuário'}`}
            ref={ref}
            style={{ width: size, height: size }}
            className={`select-none overflow-hidden flex-none rounded-full ${className}`}
            {...rest}
        >
            <NextImage
                src={src}
                width={size}
                height={size}
                alt={`Avatar de ${user?.username ?? 'ex usuário'}`}
                className='w-full h-full object-cover object-center dark:bg-darker bg-lighter'
            />
        </div>
    )

})

Image.displayName = 'Image';