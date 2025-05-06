import { Element } from "./elements";
import { LowDetailNote } from "@/core";
import { Toggle } from "@/components/buttons";

export const Item = ({ note }: { note: LowDetailNote }) => {

    const {
        Article,
        Header: { Creator, Message, Time },
        Section: { Target, Desc }
    } = Element;

    return (
        <Article>
            <header className="flex items-center gap-3">
                <Creator user={note.user} />
                <div className="flex flex-col">
                    <Message user={note.user} />
                    <Time time={note.created_at} />
                </div>
            </header>
            <section className="p-3 rounded flex flex-col gap-2 dark:bg-semidark bg-semilight">
                <Target note={note} />
                <Desc>{note.description}</Desc>
                <Toggle.Flame size={18} note={note} useCount />
            </section>
        </Article>
    )

}