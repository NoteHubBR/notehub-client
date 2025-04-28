import { Element } from "./elements";
import { useRef } from "react";

export { Skeleton as header } from './skeleton';

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const sortRef = useRef<HTMLButtonElement>(null);
    const closeSortRef = useRef<HTMLSpanElement>(null);

    const orderRef = useRef<HTMLButtonElement>(null);
    const closeOrderRef = useRef<HTMLSpanElement>(null);

    return (
        <header className="pb-4 border-b dark:border-neutral-700/50 border-dark/25" {...props}>
            <nav>
                <ul className="flex items-center justify-between inlg:justify-center gap-2 flex-wrap">
                    <Element.Input placeholder="Encontrar uma nota..." />
                    <Element.Select ref={sortRef} text="Ordem">
                        <Element.Dropdown triggerRef={sortRef} closeRef={closeSortRef}>
                            <Element.Summary ref={closeSortRef} summary="Selecione a ordem" />
                            <ul className="flex flex-col">
                                <Element.Option sParam="order" value={["followersCount", null]} text="seguidores" />
                                <Element.Option sParam="order" value={["username"]} text="nome" />
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
                </ul>
            </nav>
        </header>
    )

}