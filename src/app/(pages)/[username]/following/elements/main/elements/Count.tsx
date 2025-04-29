import { IconUsersGroup } from "@tabler/icons-react";
import { LowDetailUser } from "@/core";

interface CountProps extends React.HTMLAttributes<HTMLImageElement> {
    user: LowDetailUser;
}

export const Count = ({ user, ...rest }: CountProps) => (
    <figure
        className="absolute top-1 left-1
            flex items-center gap-1 py-2 px-2 rounded-full
            text-xs decoration-2 text-white
            dark:bg-lighter/30 bg-darker/30
            backdrop-blur moz:backdrop-blur-none
            drop-shadow-alpha-d-sm"
        {...rest}
    >
        <IconUsersGroup size={20} />
        <span>{user.followers_count}</span>
    </figure>
)