import { Banner as Cover } from "@/components/Banner";
import { clsx } from "clsx";
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
                className={clsx(
                    'cursor-pointer overlay',
                    user.banner ?? '!cursor-default !overlay-none'
                )}
            />
            {user.banner &&
                <Portal triggerRef={bannerRef} childRef={upscaledBannerRef} useDefaultClose>
                    <PicturePortal ref={upscaledBannerRef} user={user} fill />
                </Portal>
            }
            <Photo
                ref={photoRef}
                user={user} size={111}
                className={clsx(
                    'cursor-pointer overlay',
                    'absolute bottom-0 left-4 inlg:left-2 translate-y-1/2',
                    'border-4 dark:border-darker border-lighter',
                    user.avatar ?? '!cursor-default !overlay-none'
                )}
            />
            {user.avatar &&
                <Portal triggerRef={photoRef} childRef={upscaledPhotoRef} useDefaultClose>
                    <PicturePortal ref={upscaledPhotoRef} user={user} size={369} className="rounded-full" />
                </Portal>
            }
            <Title displayName={user.display_name} history={history} />
        </div>
    )

}