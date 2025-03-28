import { clsx } from "clsx";
import { Component } from "@/components";
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
            <Component.Banner
                ref={bannerRef}
                user={user}
                className={clsx(
                    'cursor-pointer overlay',
                    user.banner ?? '!cursor-default !overlay-none'
                )}
            />
            {user.banner &&
                <Template.Portal triggerRef={bannerRef} childRef={upscaledBannerRef} useDefaultClose>
                    <Component.PicturePortal ref={upscaledBannerRef} user={user} fill />
                </Template.Portal>
            }
            <Component.Photo
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
                <Template.Portal triggerRef={photoRef} childRef={upscaledPhotoRef} useDefaultClose>
                    <Component.PicturePortal ref={upscaledPhotoRef} user={user} size={369} className="rounded-full" />
                </Template.Portal>
            }
            <Title user={user} history={history} />
        </div>
    )

}