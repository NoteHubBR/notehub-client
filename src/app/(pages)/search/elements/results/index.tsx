import { LowDetailNote, LowDetailUser, Page } from "@/core";
import { Nav } from "./nav";
import { Note } from "./note";
import { User } from "./user";

interface ResultsProps extends React.HTMLAttributes<HTMLElement> {
    page: Omit<Page<(LowDetailUser | LowDetailNote)>, "content">;
    contents: (LowDetailUser | LowDetailNote)[];
    isEmpty: boolean;
    totalElements: number;
}

export { Skeleton as results } from './skeleton';
export const Results = ({ page, contents, isEmpty, totalElements, ...rest }: ResultsProps) => {

    const isUser = (item: LowDetailUser | LowDetailNote): item is LowDetailUser => {
        return (item as LowDetailUser).username !== undefined;
    }

    return (
        <section
            className="px-2 py-4 rounded-[5px] flex-1"
            {...rest}
        >
            <header className="pt-2 pb-4 flex inmd:flex-col justify-between gap-4">
                {totalElements > 0
                    ?
                    <>
                        {totalElements > 1
                            ?
                            <h3 className="text-center text-xl font-semibold">
                                {contents.length} resultados de {totalElements}
                            </h3>
                            :
                            <h3 className="text-center text-xl font-semibold">
                                1 resultado
                            </h3>
                        }
                    </>
                    :
                    <h3>
                        Nada encontrado.
                    </h3>
                }
                <Nav page={page} isEmpty={isEmpty} />
            </header>
            <ul className="flex flex-col gap-3">
                {contents.map(item => (
                    <li key={isUser(item) ? item.username : item.id}>
                        {isUser(item)
                            ? <User user={item} />
                            : <Note note={item} />
                        }
                    </li>
                ))}
            </ul>
        </section>
    )

}