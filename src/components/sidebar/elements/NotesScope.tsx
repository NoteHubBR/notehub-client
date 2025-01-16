import { Button } from "./Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { LowDetailNote } from "@/core";
import { NoteLink } from "./NoteLink";
import { useEffect, useState } from "react";
import { useUser } from "@/data/hooks";
import Link from "next/link";

export const NotesScope = () => {

    const { notes } = useUser();

    const sliced = notes.slice(0, 0);

    const [listState, setListState] = useState<LowDetailNote[]>([]);

    useEffect(() => { setListState(sliced) }, [notes])

    const isExpanded = listState.length === notes.length;

    const toggleList = (): void => { return setListState(isExpanded ? sliced : notes) }

    return (
        <div className="flex flex-col gap-3">
            <Input type="text" required />
            {listState.map(note =>
                <Field key={note.id}>
                    <Link href={`/${note.user.username}/${note.id}`}>
                        <NoteLink avatar={note.user.avatar} username={note.user.username} title={note.title} />
                    </Link>
                </Field>
            )}
            <Button
                className="w-fit flex items-center gap-3 py-1 cursor-pointer hover:text-violet-500 transition-colors"
                text={isExpanded ? "Mostrar menos" : "Mostrar mais"}
                onClick={toggleList}
            />
        </div>
    )

}