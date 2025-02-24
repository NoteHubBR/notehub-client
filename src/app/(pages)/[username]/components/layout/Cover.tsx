import { LowDetailUser, User } from "@/core";
import { Photo } from "@/components/Photo"
import Image from "next/image";

export const Cover = ({ user }: { user: User | LowDetailUser }) => {
    return (
        <figure className="relative w-full h-full">
            <Image
                src={'https://marketplace.canva.com/EAEeOQwo3jY/1/0/1600w/canva-purple-mountain-vintage-retro-twitch-banner-1NYTq34QR6I.jpg'}
                alt="cover" width={1280} height={0}
            />
            <Photo
                user={user} size={111}
                className="absolute bottom-0 left-4 translate-y-1/2" />
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
};