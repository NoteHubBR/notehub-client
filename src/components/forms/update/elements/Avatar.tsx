import { IconCameraPlus } from "@tabler/icons-react";
import { Photo } from "@/components/Photo";
import { User } from "@/core";

interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
    user: User,
}

export const Avatar = ({ user, ...props }: AvatarProps) => {
    return (
        <div className="select-none bot-mid left-4 drop-shadow-[0_0_1px_rgba(0,0,0,0.33)]">
            <Photo user={user} size={111} {...props} />
            <button type="button" className="center rounded-full p-2 bg-[rgba(0,0,0,.5)] backdrop-blur">
                <IconCameraPlus color="white" />
            </button>
        </div>
    )
}