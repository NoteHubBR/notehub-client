import { forwardRef } from "react";
import { User } from "@/core";
import Image from "next/image";

interface PhotoProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    user: Partial<User>;
    size?: number;
    className?: string;
}

export const Photo = forwardRef<HTMLImageElement, PhotoProps>((props, ref) => {
    const { src, user, size = 30, className, ...rest } = props;
    if (user.username) {
        return (
            <figure
                ref={ref}
                style={{ width: size, height: size }}
                className={`overflow-hidden flex-none rounded-full ${className}`} {...rest}
            >
                <Image
                    src={src ?? user.avatar ?? '/imgs/avatar.png'}
                    width={size}
                    height={size}
                    alt={`Avatar de ${user.username}`}
                    className="w-full h-full object-cover dark:bg-neutral-950 bg-neutral-50"
                />
            </figure>
        )
    }
})

Photo.displayName = 'Photo';