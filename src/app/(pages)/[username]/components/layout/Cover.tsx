import { LowDetailUser, User } from "@/core";
import { Photo } from "@/components/Photo";
import { PicturePortal } from "@/components/PicturePortal";
import { Portal } from "@/components/template/Portal";
import { useRef } from "react";
import Image from "next/image";

export const Cover = ({ user }: { user: User | LowDetailUser }) => {

    const photoRef = useRef<HTMLImageElement>(null);
    const upscaledPhotoRef = useRef<HTMLImageElement>(null);
    const coverRef = useRef<HTMLImageElement>(null);
    const upscaledCoverRef = useRef<HTMLImageElement>(null);

    return (
        <figure className="relative w-full h-full">
            <Image
                ref={coverRef}
                src={'https://pbs.twimg.com/profile_banners/1642957463346356237/1685224906/1500x500'}
                alt="cover" width={1500} height={1500}
                className="cursor-pointer"
            />
            <Portal refElement={coverRef} refChild={upscaledCoverRef}>
                <PicturePortal ref={upscaledCoverRef} user={user} fill />
            </Portal>
            <Photo
                ref={photoRef}
                user={user} size={111}
                className="cursor-pointer absolute bottom-0 left-4 translate-y-1/2"
            />
            <Portal refElement={photoRef} refChild={upscaledPhotoRef}>
                <PicturePortal ref={upscaledPhotoRef} user={user} size={369} className="rounded-full" />
            </Portal>
            <h1
                className="absolute bottom-2 left-36 inlg:left-32
                py-1 px-2 rounded-md
                font-semibold text-xl text-white
                backdrop-blur-sm
                bg-neutral-900/20"
            >
                {user.display_name}
            </h1>
        </figure>
    )

}