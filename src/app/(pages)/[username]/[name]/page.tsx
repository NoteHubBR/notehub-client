'use client';

import { createPortal } from 'react-dom';
import { Element } from './elements';
import { Form } from '@/components/forms';
import { handleFieldErrorsMsg, Note, NoteSecret } from '@/core';
import { IconEyeOff, IconLock, IconNotesOff, IconPictureInPicture } from '@tabler/icons-react';
import { Section } from '../components/Section';
import { Skeleton } from './skeleton';
import { Template } from '@/components/templates';
import { useApi, useFullscreen, usePiP, useTitle, useUser } from '@/data/hooks';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

const Page = () => {

    const { noteQueries: { useGetNote } } = useApi();

    const { isMounted, token, user } = useUser();
    const { setTitle } = useTitle();

    const { username, name } = useParams<{ username: string; name: string }>();

    const { data: response, isLoading } = useGetNote(token ? token.access_token : null, username, name, isMounted);

    const [note, setNote] = useState<Note | null>(null);
    const [secret, setSecret] = useState<NoteSecret | null>(null);
    const [pendingConfiguration, setPendingConfiguration] = useState<boolean>(false);
    const [onConfiguration, setOnConfiguration] = useState<boolean>(false);
    const [pendingEdition, setPendingEdition] = useState<boolean>(false);
    const [onEdition, setOnEdition] = useState<boolean>(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const childRef = useRef<HTMLFormElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const isLocked = note ?
        note.encrypted ?
            secret ?
                false :
                true :
            false :
        false;

    const plaintext: string | null = note ?
        note.encrypted ?
            secret ?
                secret.plaintext :
                null :
            note.markdown :
        null;

    const displaytext: string | null = note ?
        note.encrypted ?
            secret ?
                secret.plaintext :
                note.markdown :
            note.markdown :
        null;


    const enterConfiguration = () => {
        if (!note) return;
        if (note.encrypted) if (isLocked) return setPendingConfiguration(true);
        setOnConfiguration(true);
    }

    useEffect(() => {
        if (!response || response.type !== 'ok') return;
        const note = response.data;
        setNote(note);
        setTitle(note.user ? `${note.user.username}/${note.name}` : note.name);
        setSecret(prev => prev && note.encrypted && prev.id === note.id && prev.cipher === note.markdown
            ? prev
            : null
        )
    }, [response])

    const { ref: ref, isSupported: fullscreenSupported, isFullscreen, toggle: toggleFullscreen, } = useFullscreen<HTMLFormElement>();
    const { isSupported: pipWindowSupported, open: openPiP, pipWindow } = usePiP();

    const { Navigator, Aside, Comments, Dialog, PipFallback } = Element;

    if (isLoading) return <Skeleton />;

    if (response) {

        if (response.type === 'notfound') return (
            <Section className='p-6 flex items-center justify-center'>
                <Dialog
                    icon={IconNotesOff}
                    title='404'
                    desc='Nota não encontrada.'
                />
            </Section>
        )

        if (response.type === 'forbidden') {
            const { notCurrent, notMutual } = handleFieldErrorsMsg(response.data);
            if (notCurrent) return (
                <Section className='p-6 flex items-center justify-center'>
                    <Dialog
                        icon={IconEyeOff}
                        title='Nota oculta'
                        desc='Nome auto explicativo.'
                    />
                </Section>
            )
            if (notMutual) return (
                <Section className='p-6 flex items-center justify-center'>
                    <Dialog
                        icon={IconLock}
                        title='Perfil privado'
                        desc='Necessário que ambos de vocês se sigam.'
                    />
                </Section>
            )
            return null;
        }

        if (note) {
            const noteContent = <Form.Note.TextUpdate
                ref={ref}
                token={token}
                isLocked={isLocked}
                secret={secret}
                setSecret={setSecret}
                pendingConfiguration={pendingConfiguration}
                setPendingConfiguration={setPendingConfiguration}
                onConfiguration={onConfiguration}
                setOnConfiguration={setOnConfiguration}
                pendingEdition={pendingEdition}
                setPendingEdition={setPendingEdition}
                onEdition={onEdition}
                setOnEdition={setOnEdition}
                note={note}
                setNote={setNote}
                author={note.user ? note.user.username : null}
                currentUser={user ? user.username : null}
                displaytext={displaytext ?? ''}
                fullscreenSupported={fullscreenSupported}
                isFullscreen={isFullscreen}
                toggleFullscreen={toggleFullscreen}
                pipWindowSupported={pipWindowSupported}
                pipWindow={pipWindow}
                openPiP={openPiP}
            />
            return (
                <section className='max-w-[999px] w-full m-auto pb-64'>
                    <Navigator isFullscreen={isFullscreen} pipWindow={pipWindow} />
                    <section className='flex inlg:flex-col-reverse'>
                        <Template.Portal
                            blur='sm'
                            triggerRef={triggerRef}
                            childRef={childRef}
                            closeRef={closeRef}
                            action={enterConfiguration}
                            customState={onConfiguration}
                            setCustomState={setOnConfiguration}
                        >
                            <Form.Note.Update
                                ref={childRef}
                                closeRef={closeRef}
                                token={token}
                                isLocked={isLocked}
                                secret={secret}
                                setSecret={setSecret}
                                note={note}
                                setNote={setNote}
                                plaintext={plaintext as string}
                            />
                        </Template.Portal>
                        {pipWindow
                            ?
                            <>
                                <PipFallback icon={IconPictureInPicture} />
                                {createPortal(noteContent, pipWindow.document.body)}
                            </>
                            : noteContent
                        }
                        <Aside
                            triggerRef={triggerRef}
                            note={note}
                            author={note.user ? note.user.username : null}
                            currentUser={user ? user.username : null}
                            isEditing={onEdition}
                        />
                    </section>
                    <section className='w-[72.5%] inlg:w-full inmd:px-2 py-2'>
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

    }

    return null;

}

export default Page;