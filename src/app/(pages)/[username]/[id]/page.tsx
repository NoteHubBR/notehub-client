'use client';

import { Element } from "./elements";
import { Form } from "@/components/forms";
import { Note } from "@/core";
import { Skeleton } from "./skeleton";
import { Template } from "@/components/templates";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { UUID } from "crypto";

const Page = () => {

    const { noteService: { getNote } } = useServices();

    const { isMounted, token, user } = useUser();

    const noteId = useParams<{ username: string; id: UUID }>().id;

    const [note, setNote] = useState<Note | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const childRef = useRef<HTMLFormElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const init = useCallback(async () => {
        const accessToken = token ? token.access_token : null;
        setNote(await getNote(accessToken, noteId));
    }, [getNote, noteId, token]);

    useEffect(() => {
        if (isMounted) init();
    }, [isMounted])

    const { Aside, Comments } = Element;

    if (!note) return <Skeleton />;

    if (note) return (
        <section className="max-w-[999px] w-full m-auto">
            <section className="flex inlg:flex-col-reverse">
                <Template.Portal blur="sm" triggerRef={triggerRef} childRef={childRef} closeRef={closeRef}>
                    <Form.Note.Update
                        ref={childRef}
                        closeRef={closeRef}
                        token={token}
                        note={note}
                        setNote={setNote}
                    />
                </Template.Portal>
                <Form.Note.TextUpdate
                    token={token}
                    note={note}
                    author={note.user.username}
                    currentUser={user ? user.username : null}
                />
                <Aside
                    triggerRef={triggerRef}
                    note={note}
                    author={note.user.username}
                    currentUser={user ? user.username : null}
                />
            </section>
            <section className="w-[72.5%] inlg:w-full inmd:px-2 py-2">
                <Comments
                    token={token}
                    user={user}
                    note={note}
                    setNote={setNote}
                />
            </section>
        </section>
    )

}

export default Page;