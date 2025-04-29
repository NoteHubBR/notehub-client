import { LowDetailUser } from "@/core";

export const Section = ({ user, ...rest }: { user: LowDetailUser } & React.HTMLAttributes<HTMLElement>) => (
    <section
        style={{ backgroundImage: `url('${user.banner ?? '/imgs/banner.png'}')` }}
        className="select-none overflow-hidden
        absolute bottom-0 right-0
        h-36 w-48 rounded
        bg-cover bg-no-repeat bg-center
        group-hover/li:bottom-2 group-hover/li:right-2
        transition-all"
        {...rest}
    />
)