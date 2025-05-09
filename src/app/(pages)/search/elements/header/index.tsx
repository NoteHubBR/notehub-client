import { useSearchParams } from "next/navigation";
import { Sorter } from "./Sorter";

export { Skeleton as header } from "./skeleton";
export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const params = useSearchParams();
    const param = params.get('q');

    return (
        <header
            className="max-w-[888px] w-full m-auto my-3 flex items-center justify-between
            inmd:flex-col gap-3"
            {...props}
        >
            {param &&
                <h2 className="text-xl font-bold">
                    Resultados para <span>&quot;{param}&quot;</span>
                </h2>
            }
            <nav>
                <ul className="flex gap-3 inlg:gap-1 justify-center">
                    <Sorter
                        orderParam="order"
                        orderValues={["relevant", null]}
                        sortParam="sort"
                        sortValues={["desc", null]}
                    >
                        Relevância
                    </Sorter>
                    <Sorter
                        orderParam="order"
                        orderValues={["createdAt"]}
                        sortParam="sort"
                        sortValues={["desc"]}
                    >
                        Recente
                    </Sorter>
                    <Sorter
                        orderParam="order"
                        orderValues={["createdAt"]}
                        sortParam="sort"
                        sortValues={["asc"]}
                    >
                        Antigo
                    </Sorter>
                </ul>
            </nav>
        </header>
    )

}