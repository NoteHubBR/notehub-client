import { clsx } from "clsx";
import { forwardRef } from "react";
import { User } from "@/core";
import Image from "next/image";

interface PicturePortalProps {
    user: Partial<User> | null;
    size?: number;
    fill?: boolean;
    className?: string;
}

export const PicturePortal = forwardRef<HTMLImageElement, PicturePortalProps>(({ user, size, fill, className }, ref) => {
    if (user) return (
        <>
            {size &&
                <figure
                    ref={ref}
                    style={{ width: size, height: size }}
                    className={`overflow-hidden m-auto ${className}`}
                >
                    <Image
                        src={user.avatar ?? '/imgs/avatar.png'}
                        alt={`Avatar de ${user.username}`}
                        width={size}
                        height={size}
                        className="w-full h-full object-cover object-center"
                    />
                </figure>
            }
            {fill &&
                <figure
                    role="banner"
                    ref={ref}
                    className={clsx(
                        'overflow-hidden',
                        'aspect-[3/1]',
                        className
                    )}
                >

                    <Image
                        src={user.banner ?? '/imgs/banner.png'}
                        alt={`Capa de ${user.username}`}
                        fill
                    />
                </figure>
            }
        </>
    )

    return <></>;

})

PicturePortal.displayName = 'PicturePortal';