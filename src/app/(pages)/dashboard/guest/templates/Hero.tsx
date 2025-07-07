import { clsx } from "clsx";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
    flip?: boolean;
    title: string;
    subtitle: string;
    message: string;
}

const Invitation = ({ children, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <Link
        href="/signup"
        className="invitation-btn group
        w-[166.6px] h-[44px]
        inmd:mx-auto
        insm:w-[133px] insm:h-[36px]
        rounded px-4 py-2
        flex items-center justify-center gap-3
        tracking-wider text-xl insm:text-sm dark:text-darker text-lighter
        dark:bg-lighter bg-darker
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
        hover:!text-white hover:gap-1
        focus:!text-white focus:gap-1"
        {...rest}
    >
        <span className="group-hover:scale-[85%] group-focus:scale-[85%] transition-all duration-500">
            {children}
        </span>
        <span className="group-hover:scale-90 group-focus:scale-90 transition-all duration-500">
            <IconChevronRight size={18} />
        </span>
    </Link>
)

export const Hero = ({ flip, title, subtitle, message, ...rest }: HeroProps) => (
    <div
        className={clsx(
            'px-4 insm:py-4',
            'flex items-center justify-center',
            flip && 'order-2'
        )}
    >
        <div className="max-w-[444px] w-full mx-auto flex flex-col gap-12 insm:gap-8" {...rest}>
            <section className="flex flex-col gap-6 insm:gap-4">
                <h2 className="text-semibold text-5xl inmd:text-center insm:text-3xl">{title}</h2>
                <h3 className="text-medium text-2xl inmd:text-center insm:text-lg">{subtitle}</h3>
            </section>
            <Invitation>{message}</Invitation>
        </div>
    </div>
)