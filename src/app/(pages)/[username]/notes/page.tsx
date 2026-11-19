'use client';

import { buildQueryStrings, handleFieldErrorsMsg, NOTES_QUERY, queryLocal } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconNotesOff } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useUser, useTags, useNotes, useApi } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const search = sParams.toString();

    const { isMounted, token, user } = useUser();
    const { notes: currentNotes } = useNotes();
    const { tags: currentTags } = useTags();

    const accessToken = token ? token.access_token : null;
    const isCurrentUser = user ? user.username === username : false;

    const { noteQueries: { useFindUserTags, useFindUserNotes } } = useApi();

    const { data: remoteNotesResponse, isLoading: remoteNotesLoading, isFetching: remoteNotesFetching } = useFindUserNotes(
        accessToken,
        username,
        buildQueryStrings(sParams),
        isMounted && !isCurrentUser,
    )

    const { data: remoteTagsResponse, isLoading: remoteTagsLoading } = useFindUserTags(
        accessToken,
        username,
        isMounted && !isCurrentUser,
    )

    const localNotes = useMemo(() => {
        if (!isCurrentUser || !currentNotes) return null;
        return queryLocal(NOTES_QUERY, currentNotes, new URLSearchParams(search));
    }, [isCurrentUser, currentNotes, search])

    const notesResponse = isCurrentUser
        ? localNotes ? { type: 'ok' as const, data: localNotes } : null
        : remoteNotesResponse;
    const notesLoading = isCurrentUser ? currentNotes === null : remoteNotesLoading;
    const notesFetching = isCurrentUser ? false : remoteNotesFetching;

    const tags = isCurrentUser ? currentTags : remoteTagsResponse ? remoteTagsResponse.data as string[] : null;
    const tagsLoading = isCurrentUser ? currentTags === null : remoteTagsLoading;

    if (notesLoading || tagsLoading) return (
        <Section className="p-4">
            <Element.header />
            <Element.main />
            <Element.footer />
        </Section>
    )

    if (notesResponse) {
        if (notesResponse.type === 'notfound') return null;
        if (notesResponse.type === 'forbidden') {
            const { notCurrent, notMutual } = handleFieldErrorsMsg(notesResponse.data);
            if (notCurrent) return (
                <Section className="p-6 flex">
                    <Element.Dialog
                        icon={IconEyeOff}
                        title="Notas ocultas"
                        desc="Nome auto explicativo."
                    />
                </Section>
            )
            if (notMutual) return (
                <Section className="p-6 flex">
                    <Element.Dialog
                        icon={IconLock}
                        title="Perfil privado"
                        desc="Necessário que ambos de vocês se sigam."
                    />
                </Section>
            )
        }
        if (notesResponse.type === 'ok') {
            const { content: notes, ...page } = notesResponse.data;
            const emptyList = notes.length === 0;
            return (
                <Section className="p-4 flex flex-col">
                    <Element.Header tags={tags ?? [] as string[]} />
                    {notesFetching
                        ? <Element.Loading />
                        : emptyList
                            ? <Element.Dialog
                                icon={IconNotesOff}
                                title="Zero"
                                desc="Nada encontrado."
                            />
                            :
                            <>
                                <Element.Main notes={notes} />
                                <Element.Footer page={page} isEmpty={emptyList} />
                            </>
                    }
                </Section>
            )
        }
        return null;
    }

}

export default Page;