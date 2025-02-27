import { forwardRef } from "react";
import { User } from "@/core";
import Image from "next/image";

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Partial<User>;
    className?: string;
}

export const Banner = forwardRef<HTMLImageElement, BannerProps>((props, ref) => {
    const { user, className, ...rest } = props;
    if (user.banner && user.username) {
        return (
            <figure
                role="banner"
                ref={ref}
                className={`overflow-hidden w-full aspect-[3/1] ${className}`} {...rest}
            >
                <Image
                    src={user.banner}
                    fill
                    alt={`Avatar de ${user.username}`}
                />
            </figure>
        );
    }
    return null;
})

Banner.displayName = 'Banner';