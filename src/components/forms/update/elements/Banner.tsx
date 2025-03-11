import { Banner as GlobalBanner } from "@/components/Banner";
import { IconCameraPlus } from "@tabler/icons-react";
import { User } from "@/core";

interface BannerProps extends React.HTMLAttributes<HTMLImageElement> {
    user: User,
    children: React.ReactNode
}

export const Banner = ({ user, children, ...props }: BannerProps) => {
    return (
        <div className="select-none relative">
            <GlobalBanner user={user} {...props} />
            <button type="button" className="center rounded-full p-2 bg-[rgba(0,0,0,.5)] backdrop-blur">
                <IconCameraPlus color="white" />
            </button>
            {children}
        </div>
    )
}