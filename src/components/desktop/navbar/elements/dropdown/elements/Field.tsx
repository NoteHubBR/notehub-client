import { IconChevronRight } from "@tabler/icons-react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    text: string;
    useChevron?: boolean;
}
interface LinkProps extends NextLinkProps {
    target?: string;
    children: React.ReactNode;
    text: string;
    useChevron?: boolean;
}

const Button = ({ children, text, useChevron, ...rest }: ButtonProps) => {
    return (
        <button
            className="
                py-2 px-4 
                flex items-center justify-between gap-4 
                hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10
                transition-colors
            "
            {...rest}
        >
            <div className="flex items-center justify-center">
                {children}
            </div>
            <span className="w-full text-start text-sm">{text}</span>
            {useChevron && <IconChevronRight size={28} />}
        </button>
    )
}

const Link = ({ target, children, text, useChevron, ...rest }: LinkProps) => {
    return (
        <NextLink
            className="
                py-2 px-4 
                flex items-center justify-between gap-4 
                hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10
                transition-colors
            "
            target={target}
            {...rest}
        >
            <div className="flex items-center justify-center">
                {children}
            </div>
            <span className="w-full text-start text-sm">{text}</span>
            {useChevron && <IconChevronRight size={28} />}
        </NextLink>
    )
}

export const Field = { Button, Link }