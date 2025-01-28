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
        <li>
            <button
                className="
                        w-full py-2 px-4
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
        </li>
    )
}

const Link = ({ target, children, text, useChevron, ...rest }: LinkProps) => {
    return (
        <li>
            <NextLink
                className="
                        w-full py-2 px-4
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
        </li>
    )
}

export const Field = { Button, Link }