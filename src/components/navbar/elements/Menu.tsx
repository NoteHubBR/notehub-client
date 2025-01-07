'use client';

import { IconMenu2 } from "@tabler/icons-react";
import { useMenu } from "@/data/hooks";

export const Menu = (props: React.HTMLAttributes<HTMLButtonElement>) => {

    const { isOpen, setIsOpen } = useMenu();

    return (
        <button
            className="p-1 rounded-full hover:bg-neutral-50/15 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            {...props}
        >
            <IconMenu2 size={30} />
        </button>

    )

}