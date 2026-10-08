import { Banner as BannerComponent, Photo, PicturePortal } from "@/components";
import { clsx } from "clsx";
import { LowDetailUser, User } from "@/core";
import { Template } from "@/components/templates";
import { Title } from "./Title";
import { useRef } from "react";

export const Banner = ({ user, history }: { user: User | LowDetailUser, history: string[] }) => {

    const bannerRef = useRef<HTMLImageElement>(null);
    const upscaledBannerRef = useRef<HTMLImageElement>(null);
    const photoRef = useRef<HTMLImageElement>(null);
    const upscaledPhotoRef = useRef<HTMLImageElement>(null);

    return (
        <div className="relative w-full h-full">
            <BannerComponent
                ref={bannerRef}
                user={user}
                className={clsx(
                    user.blocked || !user.banner ? 'cursor-default' : 'cursor-pointer overlay'
                )}
            />
            {!user.blocked && user.banner &&
                <Template.Portal triggerRef={bannerRef} childRef={upscaledBannerRef} useDefaultClose>
                    <PicturePortal ref={upscaledBannerRef} user={user} fill />
                </Template.Portal>
            }
            <Photo
                ref={photoRef}
                user={user} size={111}
                className={clsx(
                    'absolute bottom-0 left-4 inlg:left-2 translate-y-1/2',
                    'border-4 dark:border-darker border-lighter',
                    user.blocked || !user.avatar ? 'cursor-default' : 'cursor-pointer overlay'
                )}
            />
            {!user.blocked && user.avatar &&
                <Template.Portal triggerRef={photoRef} childRef={upscaledPhotoRef} useDefaultClose>
                    <PicturePortal ref={upscaledPhotoRef} user={user} size={369} className="rounded-full" />
                </Template.Portal>
            }
            <Title user={user} history={history} />
        </div>
    )

}