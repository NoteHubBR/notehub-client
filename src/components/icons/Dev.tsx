import { clsx } from 'clsx';
import { IconCode } from '@tabler/icons-react';
import { LowDetailUser, User } from '@/core';

interface Dev extends React.ImgHTMLAttributes<HTMLImageElement> {
    user: User | LowDetailUser;
    size?: number;
    useWhite?: boolean;
}

export const Dev = ({ user, size = 24, useWhite, className, ...rest }: Dev) => {
    if (user.dev) return (
        <figure
            role="img"
            aria-label="Desenvolvedor"
            className={clsx(
                'select-none pointer-events-none relative',
                'flex-none inline-block align-middle',
                'drop-shadow-alpha-d-sm',
                className
            )}
            {...rest}
        >
            <div
                aria-hidden="true"
                style={{ width: `${size}px`, height: `${size}px` }}
                className={clsx(
                    'rounded-full',
                    useWhite ? 'bg-white' : 'bg-inverted',
                    'transition-colors'
                )}
            />
            <IconCode
                size={size * 0.8}
                strokeWidth={3}
                className={clsx(
                    'center',
                    useWhite
                        ? 'text-primary'
                        : 'text-white',
                    'transition-colors'
                )}
            />
        </figure>
    )
    return null;
}