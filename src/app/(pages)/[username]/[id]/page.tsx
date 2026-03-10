'use client';

import { Element } from "./elements";
import { Form } from "@/components/forms";
import { handleFieldErrorsMsg, Note } from "@/core";
import { IconEyeOff, IconLock, IconNotesOff } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { Skeleton } from "./skeleton";
import { Template } from "@/components/templates";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";
import { UUID } from "crypto";

const Page = () => {

    const { noteServiceQueries: { useGetNote } } = useServices();

    const { isMounted, token, user } = useUser();

    const noteId = useParams<{ username: string; id: UUID }>().id;

    const { data: response, isLoading } = useGetNote(token ? token.access_token : null, noteId, isMounted);

    const [note, setNote] = useState<Note | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const childRef = useRef<HTMLFormElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (response && response.type === 'ok') setNote(response.data);
    }, [response])

    const { Aside, Comments, Dialog } = Element;

    if (isLoading) return <Skeleton />;

    if (response) {

        if (response.type === 'notfound') return (
            <Section className="p-6 flex items-center justify-center">
                <Dialog
                    icon={IconNotesOff}
                    title="404"
                    desc="Nota não encontrada."
                />
            </Section>
        )

        if (response.type === 'forbidden') {
            const { notCurrent, notMutual } = handleFieldErrorsMsg(response.data);
            if (notCurrent) return (
                <Section className="p-6 flex items-center justify-center">
                    <Dialog
                        icon={IconEyeOff}
                        title="Nota oculta"
                        desc="Nome auto explicativo."
                    />
                </Section>
            )
            if (notMutual) return (
                <Section className="p-6 flex items-center justify-center">
                    <Dialog
                        icon={IconLock}
                        title="Perfil privado"
                        desc="Necessário que ambos de vocês se sigam."
                    />
                </Section>
            )
            return null;
        }

        if (note) return (
            <section className="max-w-[999px] w-full m-auto pb-64">
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
                        author={note.user ? note.user.username : null}
                        currentUser={user ? user.username : null}
                    />
                    <Aside
                        triggerRef={triggerRef}
                        note={note}
                        author={note.user ? note.user.username : null}
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

    return null;

}

export default Page;