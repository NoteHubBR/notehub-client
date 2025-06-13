import { Element } from "./elements";
import { IconListTree } from "@tabler/icons-react";
import { Menu, MenuItem } from "@/components/menu";
import { Note } from "@/core";
import { useState } from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    sort: "repliesCount,desc" | "createdAt,desc";
    note: Note;
    setHasFetched: React.Dispatch<React.SetStateAction<boolean>>;
    setSort: React.Dispatch<React.SetStateAction<"repliesCount,desc" | "createdAt,desc">>;
}

export const Header = ({ sort, note, setSort, setHasFetched, ...rest }: HeaderProps) => {

    const { Title, Sorter } = Element;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const sortByRepliesCount = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        if (sort === "repliesCount,desc") return;
        setSort("repliesCount,desc");
        setIsMenuOpen(false);
        setHasFetched(false);
    }

    const sortByCreatedAt = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        if (sort === "createdAt,desc") return;
        setSort("createdAt,desc");
        setIsMenuOpen(false);
        setHasFetched(false);
    }

    return (
        <header className="p-2 flex items-center insm:justify-center gap-3" {...rest}>
            <Title count={note.comments_count} />
            <Sorter
                onClick={toggleMenu}
                onBlur={closeMenu}
                icon={IconListTree}
                tooltip="Ordenar"
                count={note.comments_count}
            >
                Classificar por
                <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
                    <MenuItem
                        onClick={sortByRepliesCount}
                        valueToCompare={sort}
                        currentValue="repliesCount,desc"
                        className="!font-normal insm:text-xs"
                    >
                        Principais comentários
                    </MenuItem>
                    <MenuItem
                        onClick={sortByCreatedAt}
                        valueToCompare={sort}
                        currentValue="createdAt,desc"
                        className="!font-normal insm:text-xs"
                    >
                        Mais recentes
                    </MenuItem>
                </Menu>
            </Sorter>
        </header>
    )

}