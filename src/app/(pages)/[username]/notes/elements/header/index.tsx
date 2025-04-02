import { Element } from "./elements"
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const sParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {

        const q = sParams.get('q');
        const type = sParams.get('type') ?? 'all';
        const tag = sParams.get('tag') ?? 'all';
        const order = sParams.get('order') ?? 'modifiedAt';
        const sort = sParams.get('sort') ?? 'desc';


        const newQuery = q
            ? `?${new URLSearchParams({ q, type, tag, order, sort })}`
            : `?${new URLSearchParams({ type, tag, order, sort })}`

        if (newQuery !== window.location.search) router.replace(newQuery);

    }, [router, sParams])

    const typeRef = useRef<HTMLButtonElement>(null);
    const closeTypeRef = useRef<HTMLSpanElement>(null);

    const tagRef = useRef<HTMLButtonElement>(null);
    const closeTagRef = useRef<HTMLSpanElement>(null);

    const sortRef = useRef<HTMLButtonElement>(null);
    const closeSortRef = useRef<HTMLSpanElement>(null);

    const orderRef = useRef<HTMLButtonElement>(null);
    const closeOrderRef = useRef<HTMLSpanElement>(null);

    return (
        <header className="py-4 border-b dark:border-neutral-700/50 border-dark/25" {...props}>
            <nav className="flex items-center justify-between gap-2">
                <Element.Input placeholder="Encontrar uma nota..." />
                <Element.Select ref={typeRef} text="Tipo">
                    <Element.Dropdown triggerRef={typeRef} closeRef={closeTypeRef}>
                        <Element.Summary ref={closeTypeRef} summary="Selecione o tipo" />
                        <ul className="flex flex-col">
                            <Element.Option sParam="type" value="all" text="todos" />
                            <Element.Option sParam="type" value="open" text="aberta" />
                            <Element.Option sParam="type" value="closed" text="fechada" />
                            <Element.Option sParam="type" value="hidden" text="oculta" />
                        </ul>
                    </Element.Dropdown>
                </Element.Select>
                <Element.Select ref={tagRef} text="Tag">
                    <Element.Dropdown triggerRef={tagRef} closeRef={closeTagRef}>
                        <Element.Summary ref={closeTagRef} summary="Selecione a tag" />
                        <ul className="flex flex-col">
                            <Element.Option sParam="tag" value="all" text="todos" />
                            <Element.Option sParam="tag" value="java" text="java" />
                            <Element.Option sParam="tag" value="spring" text="spring" />
                            <Element.Option sParam="tag" value="quarkus" text="quarkus" />
                        </ul>
                    </Element.Dropdown>
                </Element.Select>
                <Element.Select ref={sortRef} text="Ordem">
                    <Element.Dropdown triggerRef={sortRef} closeRef={closeSortRef}>
                        <Element.Summary ref={closeSortRef} summary="Selecione a ordem" />
                        <ul className="flex flex-col">
                            <Element.Option sParam="order" value="modifiedAt" text="atualização" />
                            <Element.Option sParam="order" value="createdAt" text="criação" />
                            <Element.Option sParam="order" value="title" text="nome" />
                            <Element.Option sParam="order" value="flamesCount" text="chamas" />
                            <Element.Option sParam="order" value="commentsCount" text="comentários" />
                        </ul>
                    </Element.Dropdown>
                </Element.Select>
                <Element.Select ref={orderRef} text="Sorteio">
                    <Element.Dropdown triggerRef={orderRef} closeRef={closeOrderRef}>
                        <Element.Summary ref={closeOrderRef} summary="Selecione o sorteio" />
                        <ul className="flex flex-col">
                            <Element.Option sParam="sort" value="asc" text="crescente" />
                            <Element.Option sParam="sort" value="desc" text="decrescente" />
                        </ul>
                    </Element.Dropdown>
                </Element.Select>
                <Element.Link href={'/new'}>Nova</Element.Link>
            </nav>
        </header>
    )
}