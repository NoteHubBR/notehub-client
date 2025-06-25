import { Button } from "./Button";
import { Component } from "@/components";
import { Filter, LowDetailNote } from "@/core";
import { Input } from "./Input";
import { Link } from "./Link";
import { useCallback, useEffect, useState } from "react";
import { useNotes } from "@/data/hooks";

export const NotesScope = () => {

    const { notes } = useNotes();

    const sliced = notes.slice(0, 6);

    const [state, setState] = useState({
        list: [] as LowDetailNote[],
        isSearching: false
    })

    const { list, isSearching } = state;

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

    useEffect(() => { setState((prev) => ({ ...prev, list: sliced })) }, [notes]);

    return (
        <div className="flex flex-col gap-3">
            <Input type="text" required onChange={findBy} />
            {list.map(note =>
                <Link
                    key={note.id}
                    href={`/${note.user!.username}/${note.id}`}
                    icon={<Component.Photo user={note.user} />}
                    text={note.title}
                />
            )}
            {!isSearching && notes.length > sliced.length &&
                <Button
                    className="w-fit flex items-center gap-3 py-1 cursor-pointer hover:text-secondary transition-colors"
                    text={isExpanded ? "Mostrar menos" : "Mostrar mais"}
                    onClick={toggleList}
                />
            }
        </div>
    )

}