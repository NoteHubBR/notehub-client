'use client';

import { Element } from "./elements";
import { Form } from "@/components/forms";
import { Note } from "@/core";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { UUID } from "crypto";

const Page = () => {

    const { noteService: { getNote } } = useServices();

    const { isMounted, token, user } = useUser();

    const noteId = useParams<{ username: string; id: UUID }>().id;

    const [note, setNote] = useState<Note | null>(null);

    const init = useCallback(async () => {
        const accessToken = token ? token.access_token : null;
        setNote(await getNote(accessToken, noteId));
    }, [getNote, noteId, token]);

    useEffect(() => {
        if (isMounted) init();
    }, [isMounted])

    const { Aside } = Element;

    if (note) return (
        <section className="max-w-[999px] w-full m-auto flex inlg:flex-col-reverse">
            <Form.Note.TextUpdate
                token={token}
                note={note}
                author={note.user.username}
                currentUser={user ? user.username : null}
            />
            <Aside
                note={note}
                author={note.user.username}
                currentUser={user ? user.username : null}
            />
        </section>
    )

}

export default Page;