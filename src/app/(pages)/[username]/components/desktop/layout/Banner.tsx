import { Banner as Cover } from "@/components/Banner";
import { LowDetailUser, User } from "@/core";
import { Photo } from "@/components/Photo";
import { PicturePortal } from "@/components/PicturePortal";
import { Portal } from "@/components/template/Portal";
import { Title } from "./Title";
import { useRef } from "react";

export const Banner = ({ user }: { user: User | LowDetailUser }) => {

    const photoRef = useRef<HTMLImageElement>(null);
    const upscaledPhotoRef = useRef<HTMLImageElement>(null);
    const bannerRef = useRef<HTMLImageElement>(null);
    const upscaledBannerRef = useRef<HTMLImageElement>(null);

    return (
        <figure className="relative w-full h-full">
            <Cover
                ref={bannerRef}
                user={user}
                className="cursor-pointer"
            />
            <Portal refElement={bannerRef} refChild={upscaledBannerRef}>
                <PicturePortal ref={upscaledBannerRef} user={user} fill />
            </Portal>
            <Photo
                ref={photoRef}
                user={user} size={111}
                className="cursor-pointer absolute bottom-0 left-4 inlg:left-2 translate-y-1/2"
            />
            <Portal refElement={photoRef} refChild={upscaledPhotoRef}>
                <PicturePortal ref={upscaledPhotoRef} user={user} size={369} className="rounded-full" />
            </Portal>
            <Title>
                {user.display_name}
            </Title>
        </figure>
    )

}