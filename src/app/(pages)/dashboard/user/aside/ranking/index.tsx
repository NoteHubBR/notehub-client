import { Element } from "./elements"
import { isEmpty } from "@/core";
import { Skeleton } from "./skeleton";
import { useNotes } from "@/data/hooks";

export const Ranking = () => {

    const { notes } = useNotes();

    const { Title, Li, Target, Desc, Flames, Link } = Element;

    if (isEmpty(notes)) return <Skeleton />;

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
                {notes.slice(0, 3).map((note) => (
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