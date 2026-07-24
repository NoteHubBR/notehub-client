import { Element } from "./elements";

export { Skeleton as header } from './skeleton';

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header className="pb-4 border-b dark:border-light/20 border-dark/20" {...props}>
            <nav>
                <ul className="flex items-center justify-between inlg:justify-center gap-2 flex-wrap">
                    <Element.Input placeholder="Encontrar uma pessoa..." />
                    <Element.Sorter orderParam="order" sortParam="sort" orderValues={["followersCount", null]} sortValues={["desc", null]}>Seguindo</Element.Sorter>
                    <Element.Sorter orderParam="order" sortParam="sort" orderValues={["username"]} sortValues={["asc"]}>A-Z</Element.Sorter>
                    <Element.Sorter orderParam="order" sortParam="sort" orderValues={["username"]} sortValues={["desc"]}>Z-A</Element.Sorter>
                </ul>
            </nav>
        </header>
    )
}