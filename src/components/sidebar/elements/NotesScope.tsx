import { Button } from "./Button";
import { Field } from "./Field";
import { Filter, LowDetailNote } from "@/core";
import { Input } from "./Input";
import { NoteLink } from "./NoteLink";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/data/hooks";
import Link from "next/link";

export const NotesScope = () => {

    const { notes } = useUser();

    const sliced = notes.slice(0, 6);

    const [state, setState] = useState({
        list: [] as LowDetailNote[],
        isSearching: false
    })

    const { list, isSearching } = state;

    useEffect(() => { setState((prev) => ({ ...prev, list: sliced })) }, [notes])

    const isExpanded = list.length === notes.length;

    const toggleList = useCallback(() => {
        setState((prev) => ({
            ...prev,
            list: isExpanded ? sliced : notes,
        }));
    }, [isExpanded, notes, sliced]);

    const findBy = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        const filtered = new Filter().findNotes(query, notes);
        setState({
            isSearching: query.length > 0,
            list: query.length < 1 ? sliced : filtered,
        })
    }, [notes, sliced])

    return (
        <div className="flex flex-col gap-3">
            <Input type="text" required onChange={findBy} />
            {list.map(note =>
                <Field key={note.id}>
                    <Link href={`/${note.user.username}/${note.id}`}>
                        <NoteLink avatar={note.user.avatar} username={note.user.username} title={note.title} />
                    </Link>
                </Field>
            )}
            {!isSearching &&
                <Button
                    className="w-fit flex items-center gap-3 py-1 cursor-pointer hover:text-violet-500 transition-colors"
                    text={isExpanded ? "Mostrar menos" : "Mostrar mais"}
                    onClick={toggleList}
                />
            }
        </div>
    )

}