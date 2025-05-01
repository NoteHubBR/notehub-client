import { Component } from "@/components";
import { Element } from "./elements"
import { useNotes } from "@/data/hooks";
import NextLink from "next/link";

export const Ranking = () => {

    const { notes } = useNotes();

    const { Title, Li, Target, Desc, Flames, Link } = Element;

    return (
        <section
            className=" h-fit p-3 rounded
            dark:bg-dark bg-light
            dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md
            inlg:h-full
            inmd:w-full"
        >
            <Title>Explore notas</Title>
            <ul className="py-3">
                {notes.slice(0, 3).map((note) => (
                    <Li key={note.id}>
                        <article className="flex flex-col gap-2">
                            <header className="flex items-center gap-2">
                                <NextLink href={`/${note.user.username}`}>
                                    <Component.Photo user={note.user} size={25} />
                                </NextLink>
                                <Target note={note} />
                            </header>
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