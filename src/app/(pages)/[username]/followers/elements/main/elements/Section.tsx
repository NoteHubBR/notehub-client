import { LowDetailUser } from "@/core";

export const Section = ({ user, ...rest }: { user: LowDetailUser } & React.HTMLAttributes<HTMLElement>) => (
    <section
        style={{ backgroundImage: `url('${user.banner ?? '/imgs/banner.png'}')` }}
        className="select-none
        absolute bottom-0 right-0
        h-36 w-48 overflow-hidden
        bg-cover bg-no-repeat bg-center
        hover:bottom-2 hover:right-2
        transition-all"
        {...rest}
    />
)