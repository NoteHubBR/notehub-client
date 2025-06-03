'use client';

import { Form } from "@/components/forms";
import { Note } from "@/core";
import { Section } from "../components/Section";
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

    if (note) return (
        <Section className="flex flex-col h-[90vh] inmd:h-[93svh]">
            <Form.Note.TextUpdate
                note={note}
                author={note.user.username}
                currentUser={user ? user.username : null}
            />
        </Section>
    )

}

export default Page;