import { Element } from "./elements"
import { isEmpty, LowDetailNote, Page } from "@/core";
import { Skeleton } from "./skeleton";
import { useCallback, useEffect, useState } from "react";
import { useServices } from "@/data/hooks";

export const Ranking = () => {

    const { noteService: { searchNotes } } = useServices();

    const [ranking, setRanking] = useState<Page<LowDetailNote>>({} as Page<LowDetailNote>);

    const getTopThreeNotes = useCallback(async () => {
        return setRanking(await searchNotes('size=3'));
    }, [searchNotes])

    useEffect(() => {
        getTopThreeNotes();
    }, [getTopThreeNotes])

    const { Title, Li, Target, Desc, Flames, Link } = Element;

    if (isEmpty(ranking)) return <Skeleton />;

    return (
        <section
            className="w-full h-fit p-3 rounded-[5px]
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
            inlg:h-full
            inmd:w-full"
        >
            <Title>Explore notas</Title>
            <ul className="py-3">
                {ranking.content.map((note) => (
                    <Li key={note.id}>
                        <article className="flex flex-col gap-2">
                            <Target note={note} />
                            <Desc>{note.description}</Desc>
                            <Flames note={note} />
                        </article>
                    </Li>
                ))}
            </ul>
            <Link />
        </section>
    )

}