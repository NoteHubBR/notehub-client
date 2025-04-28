import { IconUsersGroup } from "@tabler/icons-react";
import { LowDetailUser } from "@/core";

interface CountProps extends React.HTMLAttributes<HTMLImageElement> {
    user: LowDetailUser;
}

export const Count = ({ user, ...rest }: CountProps) => (
    <figure className="absolute bottom-1 left-1 flex items-center gap-1 text-sm !text-white" {...rest}>
        <IconUsersGroup size={20} />
        <span>{user.followers_count}</span>
    </figure>
)