import { forwardRef } from 'react';
import { User } from '@/core';
import NextImage from 'next/image';

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    user: Partial<User> | null;
    className?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
    const { src, user, className, ...rest } = props;
    return (
        <figure
            role='banner'
            ref={ref}
            className={`select-none overflow-hidden w-full aspect-[3/1] dark:bg-black bg-semilight ${className}`}
            {...rest}
        >
            <NextImage
                priority
                src={src}
                fill
                alt={`Avatar de ${user?.username ?? 'ex usuário'}`}
            />
        </figure>
    )
})

Image.displayName = 'Image';