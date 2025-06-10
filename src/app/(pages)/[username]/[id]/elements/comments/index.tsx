import { Component } from "@/components";
import { Element } from "./elements";
import { Form } from "@/components/forms";
import { IconListTree } from "@tabler/icons-react";
import { Menu, MenuItem } from "@/components/menu";
import { User } from "@/core";
import { useState } from "react";

interface CommentsProps extends React.HTMLAttributes<HTMLElement> {
    user: User | null;
}

export const Comments = ({ user, ...rest }: CommentsProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const count = 2

    const { Title, Sorter } = Element;

    return (
        <section
            className="w-[72.5%] inlg:w-full inmd:px-2 py-2"
            {...rest}
        >
            <header className="pt-2 pb-4 flex items-center gap-3">
                <Title count={count} />
                <Sorter
                    onClick={toggleMenu}
                    onBlur={closeMenu}
                    icon={IconListTree}
                    tooltip="Ordenar"
                    count={count}
                >
                    Classificar por
                    <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
                        <MenuItem
                            onClick={() => setIsMenuOpen(false)}
                            className="!font-normal insm:text-xs"
                        >
                            Principais comentários
                        </MenuItem>
                        <MenuItem
                            onClick={() => setIsMenuOpen(false)}
                            className="!font-normal insm:text-xs"
                        >
                            Mais recentes
                        </MenuItem>
                    </Menu>
                </Sorter>
            </header>
            {user &&
                <div className="flex gap-3">
                    <Component.Photo user={user} size={40} />
                    <Form.Comment.New />
                </div>
            }
        </section>
    )

}