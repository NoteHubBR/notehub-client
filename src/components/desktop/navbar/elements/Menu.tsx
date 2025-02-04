'use client';

import { IconMenu2 } from "@tabler/icons-react";
import { useStore } from "@/data/hooks";

export const Menu = (props: React.HTMLAttributes<HTMLButtonElement>) => {

    const { store, setStore } = useStore();

    return (
        <button
            className="p-1 rounded-full hover:dark:bg-neutral-50/10 hover:bg-neutral-900/15 transition-colors"
            onClick={() => setStore({ isMenuOpen: !store.isMenuOpen })}
            {...props}
        >
            <IconMenu2 size={30} />
        </button>

    )

}