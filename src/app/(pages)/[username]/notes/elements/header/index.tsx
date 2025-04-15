import { Element } from "./elements"
import { useParams } from "next/navigation";
import { useRef } from "react";
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
    const closeTypeRef = useRef<HTMLSpanElement>(null);

    const tagRef = useRef<HTMLButtonElement>(null);
    const closeTagRef = useRef<HTMLSpanElement>(null);

    const sortRef = useRef<HTMLButtonElement>(null);
    const closeSortRef = useRef<HTMLSpanElement>(null);

    const orderRef = useRef<HTMLButtonElement>(null);
    const closeOrderRef = useRef<HTMLSpanElement>(null);

    return (
        <header className="py-4 border-b dark:border-neutral-700/50 border-dark/25" {...rest}>
            <nav>
                <ul className="flex items-center justify-between inlg:justify-center gap-2 flex-wrap">
                    <Element.Input placeholder="Encontrar uma nota..." />
                    <Element.Select ref={typeRef} text="Tipo">
                        <Element.Dropdown triggerRef={typeRef} closeRef={closeTypeRef}>
                            <Element.Summary ref={closeTypeRef} summary="Selecione o tipo" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="type" value={[null]} text="todos" />
                                <Element.Option sParam="type" value={["open"]} text="aberta" />
                                <Element.Option sParam="type" value={["closed"]} text="fechada" />
                                {current && <Element.Option sParam="type" value={["hidden"]} text="oculta" />}
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    <Element.Select ref={tagRef} text="Tag">
                        <Element.Dropdown triggerRef={tagRef} closeRef={closeTagRef}>
                            <Element.Summary ref={closeTagRef} summary="Selecione a tag" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="tag" value={[null]} text="todos" />
                                {tags.map((tag, key) => (
                                    <Element.Option key={key} sParam="tag" value={[tag]} text={tag} />
                                ))}
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    <Element.Select ref={sortRef} text="Ordem">
                        <Element.Dropdown triggerRef={sortRef} closeRef={closeSortRef}>
                            <Element.Summary ref={closeSortRef} summary="Selecione a ordem" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="order" value={["modifiedAt", null]} text="atualização" />
                                <Element.Option sParam="order" value={["createdAt"]} text="criação" />
                                <Element.Option sParam="order" value={["title"]} text="título" />
                                <Element.Option sParam="order" value={["flamesCount"]} text="chamas" />
                                <Element.Option sParam="order" value={["commentsCount"]} text="comentários" />
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    <Element.Select ref={orderRef} text="Sorteio">
                        <Element.Dropdown triggerRef={orderRef} closeRef={closeOrderRef}>
                            <Element.Summary ref={closeOrderRef} summary="Selecione o sorteio" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="sort" value={["desc", null]} text="decrescente" />
                                <Element.Option sParam="sort" value={["asc"]} text="crescente" />
                            </ul>
                        </Element.Dropdown>
                    </Element.Select>
                    {current && <Element.Link>Nova</Element.Link>}
                </ul>
            </nav>
        </header>
    )

}