'use client';

import { IconMenu2 } from "@tabler/icons-react";
import { useStore, useUser } from "@/data/hooks";

export const Menu = (props: React.HTMLAttributes<HTMLButtonElement>) => {

    const { setActions, isMenuOpen } = useStore();

    const { user } = useUser();

    return (
        <button
            className="p-1 rounded-full hover:dark:bg-semilight/10 hover:bg-semidark/10 transition-colors"
            onClick={() => setActions({ isMenuOpen: !isMenuOpen(user) }, user?.username)}
            {...props}
        >
            <IconMenu2 size={30} />
        </button>

    )

}