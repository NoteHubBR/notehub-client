import { IconBell } from "@tabler/icons-react";
import { useNotifications } from "@/data/hooks";

export const Bell = () => {

    const { count } = useNotifications();

    return (
        <>
            <IconBell size={27} />
            {count > 0 &&
                <span className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center rounded-full text-sm text-lighter bg-primary">
                    {count}
                </span>
            }
        </>
    )

}