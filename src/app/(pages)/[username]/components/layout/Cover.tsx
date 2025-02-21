import { Photo } from "@/components/Photo"
import { User } from "@/core";
import Image from "next/image";

export const Cover = ({ user }: { user: User }) => {
    return (
        <figure className="relative w-full h-full">
            <Image
                src={'https://pbs.twimg.com/profile_banners/1642957463346356237/1685224906/600x200'}
                alt="cover" width={1280} height={0}
            />
            <Photo user={user} size={111} className="absolute left-4 bottom-0 translate-y-1/2" />
            <h1
                className="absolute left-36 bottom-2
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