'use client';

import { buildQueryStrings, handleFieldErrorsMsg } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconNotesOff } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useParams, useSearchParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const query = buildQueryStrings(sParams);

    const { flameServiceQueries: { useSearchUserFlames } } = useServices();

    const { isMounted, token } = useUser();

    const { data: response, isLoading, isFetching } = useSearchUserFlames(
        token ? token.access_token : null,
        username,
        query,
        isMounted
    )

    if (isLoading) return (
        <Section className="p-4">
            <Element.header />
            <Element.main />
            <Element.footer />
        </Section>
    )

    if (response) {
        if (response.type === 'notfound') return null;
        if (response.type === 'forbidden') {
            const { notCurrent, notMutual } = handleFieldErrorsMsg(response.data);
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
        if (response.type === 'ok') {
            const { content: flames, ...page } = response.data;
            const emptyList = flames.length === 0;
            return (
                <Section className="p-4 flex flex-col">
                    <Element.Header />
                    {isFetching
                        ? <Element.Loading />
                        : emptyList
                            ? <Element.Dialog
                                icon={IconNotesOff}
                                title="Zero"
                                desc="Nada encontrado."
                            />
                            :
                            <>
                                <Element.Main flames={flames} />
                                <Element.Footer page={page} isEmpty={emptyList} />
                            </>

                    }
                </Section>
            )
        }
        return null;
    }

    return null;

}

export default Page;