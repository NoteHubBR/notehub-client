import { LowDetailNote } from "@/core";
import { Toggle } from "@/components/buttons";
import { Element } from "./elements";

interface NoteProps extends React.HTMLAttributes<HTMLElement> {
    note: LowDetailNote;
}

export const Note = ({ note, ...rest }: NoteProps) => {

    const { Creator, Time, Title, Desc, Tags, Tag, Comments } = Element;

    return (
        <>
            <article
                className="w-full p-3 rounded-md
                flex flex-col items-start gap-3
                dark:bg-darker bg-lighter
                border dark:border-middark/50 border-midlight/50"
                {...rest}
            >
                <header className="relative pl-14 flex flex-col">
                    <Creator note={note} />
                    <Time note={note} />
                </header>
                <section className="-mt-1 pl-14 insm:pl-0 flex flex-col gap-1">
                    <Title note={note} />
                    <Desc className="text-sm">{note.description}</Desc>
                    <Tags>
                        {note.tags.map((tag, key) =>
                            <Tag key={key} tag={tag} />
                        )}
                    </Tags>
                </section>
                <footer className="w-full mt-1 pl-12 insm:pl-0 flex items-center justify-between">
                    <Comments note={note} />
                    <Toggle.Flame size={20} note={note} useCount />
                </footer>
            </article>
        </>
    )

}