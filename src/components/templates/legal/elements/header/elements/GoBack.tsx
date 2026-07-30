import { IconArrowLeft } from "@tabler/icons-react";
import Link, { LinkProps } from "next/link";

export const GoBack = (props: Omit<LinkProps, 'href'>) => (
    <Link
        href={'/'}
        className="group select-none relative w-fit flex items-center gap-3"
        {...props}
    >
        <span
            className="group-hover:-translate-x-2 transition-transform duration-300"
        >
            <IconArrowLeft size={18} strokeWidth={3} className="dark:text-lighter text-darker" />
        </span>
        <span className="font-semibold dark:text-lighter text-darker">
            Voltar
        </span>
    </Link>
)