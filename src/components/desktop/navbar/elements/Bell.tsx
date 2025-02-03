import { IconBell } from "@tabler/icons-react";
import { useUser } from "@/data/hooks";

export const Bell = () => {

    const { notificationsCount: notifications } = useUser();

    return (
        <>
            <IconBell size={30} />
            {notifications > 0 &&
                <span className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center rounded-full text-sm text-neutral-50 bg-violet-600">
                    {notifications}
                </span>
            }
        </>
    )

}