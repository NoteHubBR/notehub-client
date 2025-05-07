import { useSearchParams } from "next/navigation";
import { Element } from "..";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const { Li } = Element;

    const params = useSearchParams();
    const param = params.get('q');

    return (
        <header
            className="max-w-[999px] w-full m-auto my-3 pl-2 flex items-center justify-between
            inmd:flex-col gap-3"
            {...props}
        >
            {param && <h2 className="text-xl font-bold">Resultados para <span>&quot;{param}&quot;</span></h2>}
            <nav>
                <ul className="flex gap-3 inlg:gap-1 justify-center">
                    <Li onParam>Relevância</Li>
                    <Li>Recente</Li>
                    <Li>Antigo</Li>
                </ul>
            </nav>
        </header>
    )

}