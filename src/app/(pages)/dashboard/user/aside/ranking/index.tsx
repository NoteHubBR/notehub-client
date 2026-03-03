import { Element } from "./elements"
import { Skeleton } from "./skeleton";
import { Toggle } from "@/components/buttons";
import { useServices } from "@/data/hooks";

export const Ranking = () => {

    const { noteServiceQueries: { useSearchNotes } } = useServices();

    const { data: ranking, isLoading } = useSearchNotes('sort=flamesCount,desc&size=3');

    const { Title, Li, Target, Desc, Link } = Element;

    if (isLoading) return <Skeleton />;

    if (ranking) return (
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
                            <Toggle.Flame size={15} note={note} useCount />
                        </article>
                    </Li>
                ))}
            </ul>
            <Link />
        </section>
    )

    return null;

}