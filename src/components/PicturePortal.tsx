import { clsx } from "clsx";
import { forwardRef } from "react";
import { User } from "@/core";
import Image from "next/image";

interface PicturePortalProps {
    user: Partial<User>;
    size?: number;
    fill?: boolean;
    className?: string;
}

export const PicturePortal = forwardRef<HTMLImageElement, PicturePortalProps>(({ user, size, fill, className }, ref) => {
    if (user.avatar && user.banner) return (
        <>
            {size &&
                <figure
                    ref={ref}
                    style={{ width: size, height: size }}
                    className={clsx(
                        'overflow-hidden',
                        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                        className
                    )}
                >
                    <Image
                        src={user.avatar}
                        width={size}
                        height={size}
                        alt={`Avatar de ${user.username}`}
                        className="w-full h-full object-cover"
                    />
                </figure>
            }
            {fill &&
                <figure
                    role="banner"
                    ref={ref}
                    className={clsx(
                        'overflow-hidden',
                        'w-full aspect-[3/1]',
                        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                        className
                    )}
                >

                    <Image
                        src={user.banner}
                        fill
                        alt={`Capa de ${user.username}`}
                        className="w-full h-full object-cover"
                    />
                </figure>
            }
        </>
    )
    return null;
})

PicturePortal.displayName = 'PicturePortal';