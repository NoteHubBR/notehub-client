'use client';

import { buildQueryStrings, handleFieldErrorsMsg } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconNotesOff } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useParams, useSearchParams } from "next/navigation";
import { useUser, useTags, useServices } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const query = buildQueryStrings(sParams);

    const { token, user } = useUser();
    const { tags: currentTags } = useTags();

    const accessToken = token ? token.access_token : null;
    const isCurrentUser = user ? user.username === username : false;

    const { noteServiceQueries: { useFindUserTags, useFindUserNotes } } = useServices();

    const { data: tagsResponse, isLoading: tagsLoading } = useFindUserTags(
        accessToken,
        username,
        !isCurrentUser
    )

    const { data: notesResponse, isLoading: notesLoading, isFetching: notesFetching } = useFindUserNotes(
        accessToken,
        username,
        query,
        true
    )

    const tags = isCurrentUser ? currentTags : tagsResponse ? tagsResponse.data as string[] : null;

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