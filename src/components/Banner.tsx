import { forwardRef } from "react";
import { User } from "@/core";
import Image from "next/image";

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    user: Partial<User>;
    className?: string;
}

export const Banner = forwardRef<HTMLImageElement, BannerProps>((props, ref) => {
    const { src, user, className, ...rest } = props;
    if (user.username) {
        return (
            <figure
                role="banner"
                ref={ref}
                className={`overflow-hidden w-full aspect-[3/1] ${className}`} {...rest}
            >
                <Image
                    src={src ?? user.banner ?? '/imgs/banner.png'}
                    fill
                    alt={`Avatar de ${user.username}`}
                />
            </figure>
        )
    }
})

Banner.displayName = 'Banner';