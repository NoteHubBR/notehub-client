import { Banner as Cover } from "@/components/Banner";
import { LowDetailUser, User } from "@/core";
import { Photo } from "@/components/Photo";
import { PicturePortal } from "@/components/PicturePortal";
import { Portal } from "@/components/template/Portal";
import { Title } from "./Title";
import { useRef } from "react";

export const Banner = ({ user, history }: { user: User | LowDetailUser, history: string[] }) => {

    const bannerRef = useRef<HTMLImageElement>(null);
    const upscaledBannerRef = useRef<HTMLImageElement>(null);
    const photoRef = useRef<HTMLImageElement>(null);
    const upscaledPhotoRef = useRef<HTMLImageElement>(null);

    return (
        <div className="relative w-full h-full">
            <Cover
                ref={bannerRef}
                user={user}
                className="cursor-pointer
                after:absolute after:inset-0 
                after:bg-[rgba(0,0,0,.15)] after:opacity-0
                hover:after:opacity-100 after:transition-opacity"
            />
            <Portal triggerRef={bannerRef} childRef={upscaledBannerRef} useDefaultClose>
                <PicturePortal ref={upscaledBannerRef} user={user} fill />
            </Portal>
            <Photo
                ref={photoRef}
                user={user} size={111}
                className="cursor-pointer
                absolute bottom-0 left-4 inlg:left-2 translate-y-1/2
                border-2 dark:border-neutral-950 border-neutral-50
                after:absolute after:inset-0
                after:bg-[rgba(0,0,0,.15)] after:opacity-0
                hover:after:opacity-100 after:transition-opacity"
            />
            <Portal triggerRef={photoRef} childRef={upscaledPhotoRef} useDefaultClose>
                <PicturePortal ref={upscaledPhotoRef} user={user} size={369} className="rounded-full" />
            </Portal>
            <Title displayName={user.display_name} history={history} />
        </div>
    )

}