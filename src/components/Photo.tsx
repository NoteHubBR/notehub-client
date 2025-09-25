import { forwardRef } from "react";
import { User } from "@/core";
import Image from "next/image";

interface PhotoProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    user: Partial<User> | null;
    size?: number;
    className?: string;
}

export const Photo = forwardRef<HTMLImageElement, PhotoProps>((props, ref) => {
    const { src, user, size = 30, className, ...rest } = props;
    return (
        <figure
            ref={ref}
            style={{ width: size, height: size }}
            className={`select-none overflow-hidden flex-none rounded-full ${className}`} {...rest}
        >
            <Image
                src={src ? src : user && user.avatar ? user.blocked ? '/imgs/avatar.png' : user.avatar : '/imgs/avatar.png'}
                width={size}
                height={size}
                alt={`Avatar de ${user?.username ?? 'ex usuário'}`}
                className="w-full h-full object-cover dark:bg-darker bg-lighter"
            />
            <figcaption className="sr-only">{user?.display_name ?? 'ex usuário'}</figcaption>
        </figure>
    )
})

Photo.displayName = 'Photo';