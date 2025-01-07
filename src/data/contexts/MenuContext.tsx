'use client';

import { createContext, useState } from "react";

interface MenuProps {
    isOpen: boolean;
    setIsOpen: (boolean: boolean) => void;
}

const MenuContext = createContext<MenuProps>({} as any);

export const MenuProvider = (props: any) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen }}>
            {props.children}
        </MenuContext.Provider>
    )

}

export default MenuContext;