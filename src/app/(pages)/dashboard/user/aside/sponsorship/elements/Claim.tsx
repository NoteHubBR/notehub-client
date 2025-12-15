import { clsx } from "clsx";
import { IconGiftFilled } from "@tabler/icons-react";
import Link, { LinkProps } from "next/link";

export const Claim = (props: LinkProps) => (
    <Link
        className={clsx(
            'w-fit px-4 py-2 rounded-full ',
            'flex items-center gap-2',
            'bg-light',
            'transition-all ease-linear',
            'hover:drop-shadow-primary',
            'focus-visible:drop-shadow-primary',
        )}
        {...props}
    >
        <span><IconGiftFilled aria-hidden='true' size={22} className='fill-primary' /></span>
        <span className='font-playwrite font-semibold text-sm text-primary'>Resgatar</span>
    </Link>
)