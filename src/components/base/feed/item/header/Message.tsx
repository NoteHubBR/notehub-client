import { Icon } from "@/components/icons";
import { LowDetailUser } from "@/core";
import Link from "next/link";

interface MessageProps extends React.HTMLAttributes<HTMLHeadingElement> {
    user: LowDetailUser;
}

export const Message = ({ user, ...rest }: MessageProps) => (
    <h2 className="text-sm" {...rest}>
        <span>
            <Link href={`/${user.username}`} className="font-semibold hover:underline hover:text-primary">
                <Icon.Sponsor user={user} size={22} className="mr-1" />{user.display_name}
            </Link>
        </span>
        <span className="font-medium dark:text-lighter/75 text-darker/75"> criou uma nota</span>
    </h2>
)