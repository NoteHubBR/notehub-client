import { Base } from "@/components/base";
import { Component } from "@/components";
import { LowDetailNote } from "@/core";
import Link from "next/link";

export const Feed = ({ notes }: { notes: LowDetailNote[] }) => {

    const { Feed: {
        Header: {
            Title, Filter
        },
        Item: {
            Article,
            Header: { Creator, Message, Time },
            Section: { Target, Desc, Flames }
        }
    } } = Base;

    return (
        <section className="max-w-[777px] w-full">
            <header className="py-3 flex items-center justify-between">
                <Title>Feed</Title>
                <Filter />
            </header>
            <ul className="flex flex-col gap-4">
                {notes.map((note) => (
                    <li key={note.id}>
                        <Article>
                            <header className="flex items-center gap-3">
                                <Creator user={note.user} />
                                <div className="flex flex-col">
                                    <Message user={note.user} />
                                    <Time time={note.created_at} />
                                </div>
                            </header>
                            <section className="p-3 rounded flex flex-col gap-2 dark:bg-semidark bg-semilight">
                                <div className="flex items-center gap-2">
                                    <Link href={`/${note.user.username}`}>
                                        <Component.Photo user={note.user} size={25} />
                                    </Link>
                                    <Target note={note} />
                                </div>
                                <Desc>{note.description}</Desc>
                                <Flames note={note} />
                            </section>
                        </Article>
                    </li>
                ))}
            </ul>
        </section>
    )

}