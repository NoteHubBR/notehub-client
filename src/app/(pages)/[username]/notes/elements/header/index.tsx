import { Element } from "./elements";
import { useCallback, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/data/hooks";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    tags: string[];
}

export { Skeleton as header } from './skeleton';

export const Header = ({ tags, ...rest }: HeaderProps) => {

    const { username } = useParams<{ username: string }>();
    const { user } = useUser();
    const current: boolean = username === user?.username;

    const typeRef = useRef<HTMLButtonElement>(null);
    const closeTypeRef = useRef<HTMLButtonElement>(null);
    const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false);

    const tagRef = useRef<HTMLButtonElement>(null);
    const closeTagRef = useRef<HTMLButtonElement>(null);
    const [isTagOpen, setIsTagOpen] = useState<boolean>(false);

    const orderRef = useRef<HTMLButtonElement>(null);
    const closeOrderRef = useRef<HTMLButtonElement>(null);
    const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);

    const sortRef = useRef<HTMLButtonElement>(null);
    const closeSortRef = useRef<HTMLButtonElement>(null);
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

    const [filteredTags, setFilteredTags] = useState<string[]>(tags);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setFilteredTags(tags.filter((tag) => tag.includes(query)));
    }, [tags])

    return (
        <header className="pb-4 border-b dark:border-light/20 border-dark/20" {...rest}>
            <nav>
                <ul className="flex items-center justify-between inlg:justify-center gap-2 flex-wrap">
                    <Element.Input placeholder="Encontrar uma nota..." />
                    <Element.Select ref={typeRef} isDropdownOpen={isTypeOpen} text="Tipo" data-testid="select-type">
                        <Element.Dropdown
                            data-testid="type-menu"
                            triggerRef={typeRef}
                            closeRef={closeTypeRef}
                            isOpen={isTypeOpen}
                            setIsOpen={setIsTypeOpen}
                        >
                            <Element.Summary ref={closeTypeRef} dataTestId="close-type-menu" summary="Selecione o tipo" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="type" value={[null]} text="todos" data-testid="option-type-all" />
                                <Element.Option sParam="type" value={["open"]} text="aberta" data-testid="option-type-open" />
                                <Element.Option sParam="type" value={["closed"]} text="fechada" data-testid="option-type-closed" />
                                {current && <Element.Option sParam="type" value={["hidden"]} text="oculta" data-testid="option-type-hidden" />}
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    <Element.Select ref={tagRef} isDropdownOpen={isTagOpen} text="Tag" data-testid="select-tag">
                        <Element.Dropdown
                            data-testid="tags-menu"
                            triggerRef={tagRef}
                            closeRef={closeTagRef}
                            isOpen={isTagOpen}
                            setIsOpen={setIsTagOpen}
                        >
                            <Element.Summary ref={closeTagRef} dataTestId="close-tags-menu" summary="Selecione a tag" />
                            <ul className="flex flex-col">
                                <Element.Filter onChange={handleOnChange} />
                                <Element.Option sParam="tag" value={[null]} text="todas" data-testid="option-tag-all" />
                                {filteredTags.map((tag, key) => (
                                    <Element.Option key={key} sParam="tag" value={[tag]} text={tag} data-testid={`option-tag-${tag}`} />
                                ))}
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    <Element.Select ref={orderRef} isDropdownOpen={isOrderOpen} text="Ordem" data-testid="select-order">
                        <Element.Dropdown
                            data-testid="order-menu"
                            triggerRef={orderRef}
                            closeRef={closeOrderRef}
                            isOpen={isOrderOpen}
                            setIsOpen={setIsOrderOpen}
                        >
                            <Element.Summary ref={closeOrderRef} dataTestId="close-order-menu" summary="Selecione a ordem" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="order" value={["modifiedAt", null]} text="atualização" data-testid="option-order-modifiedAt" />
                                <Element.Option sParam="order" value={["createdAt"]} text="criação" data-testid="option-order-createdAt" />
                                <Element.Option sParam="order" value={["name"]} text="título" data-testid="option-order-name" />
                                <Element.Option sParam="order" value={["flamesCount"]} text="chamas" data-testid="option-order-flamesCount" />
                                <Element.Option sParam="order" value={["commentsCount"]} text="comentários" data-testid="option-order-commentsCount" />
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    <Element.Select ref={sortRef} isDropdownOpen={isSortOpen} text="Sorteio" data-testid="select-sort">
                        <Element.Dropdown
                            data-testid="sort-menu"
                            triggerRef={sortRef}
                            closeRef={closeSortRef}
                            isOpen={isSortOpen}
                            setIsOpen={setIsSortOpen}
                        >
                            <Element.Summary ref={closeSortRef} dataTestId="close-sort-menu" summary="Selecione o sorteio" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="sort" value={["desc", null]} text="decrescente" data-testid="option-sort-desc" />
                                <Element.Option sParam="sort" value={["asc"]} text="crescente" data-testid="option-sort-asc" />
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    {current && <Element.Link>Nova</Element.Link>}
                </ul>
            </nav>
        </header>
    )

}