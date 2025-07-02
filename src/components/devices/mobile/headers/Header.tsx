import { Header as GuestHeader } from "./GuestHeader";
import { Header as UserHeader } from "./UserHeader";
import { Skeleton } from "./Skeleton";
import { useScreen, useStore, useUser } from "@/data/hooks";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const { store: { isFirstTimer, isGuest, isExpired } } = useStore();
    const { onMobile } = useScreen();
    const { user } = useUser();

    if (!onMobile) return null;

    if (!user && !isFirstTimer && !isGuest && !isExpired) return <Skeleton />;

    if (isGuest || isExpired) return <GuestHeader {...props} />;

    if (user) return <UserHeader {...props} />;

}