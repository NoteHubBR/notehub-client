import { IconX } from "@tabler/icons-react";
import { Sorter } from "./Sorter";
import { usePathname, useSearchParams } from "next/navigation";

export { Skeleton as header } from "./skeleton";
export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname();
    const params = useSearchParams();
    const param = params.get('q');

    return (
        <header
            className="max-w-[888px] w-full m-auto my-3 inmd:px-2 flex items-center justify-between flex-wrap
            inmd:flex-col gap-3"
            {...props}
        >
            {param &&
                <div className="flex items-center gap-3 flex-wrap-reverse">
                    <h2 className="text-xl font-bold">
                        Resultados para <span>&quot;{param}&quot;</span>
                    </h2>
                    <button
                        onClick={() => window.history.replaceState(null, '', pathname)}
                        className="px-2 py-1 rounded
                        flex-none flex items-center gap-1
                        text-sm
                        dark:bg-semidark/50 bg-semilight/50
                        hover:dark:bg-semidark hover:bg-semilight
                        transition-colors"
                    >
                        <IconX size={14} /> Limpar
                    </button>
                </div>
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
        </header >
    )

}