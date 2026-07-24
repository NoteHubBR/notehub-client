import { Element } from "./elements";

export { Skeleton as header } from './skeleton';

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header className="pb-4 border-b dark:border-light/20 border-dark/20" {...props}>
            <nav>
                <ul className="flex items-center justify-between inlg:justify-center gap-2 flex-wrap">
                    <Element.Input placeholder="Encontrar uma nota..." />
                    <Element.Sorter sParam="sort" val={["desc", null]}>Mais recente</Element.Sorter>
                    <Element.Sorter sParam="sort" val={["asc"]}>Mais antigo</Element.Sorter>
                </ul>
            </nav>
        </header>
    )
}