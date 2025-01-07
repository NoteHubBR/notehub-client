import { IconBell } from "@tabler/icons-react";
import { User } from "@/core";

interface BellProps {
    user: User;
}

export const Bell = (props: BellProps) => {

    const { user } = props;

    return (
        <div>
            <IconBell size={30} />
            {user.notifications > 0 &&
                <span className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center rounded-full text-sm bg-violet-500">
                    {user.notifications}
                </span>
            }
        </div>
    )

}