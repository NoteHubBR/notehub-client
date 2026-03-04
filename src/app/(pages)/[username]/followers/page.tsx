'use client';

import { buildQueryStrings, handleFieldErrorsMsg } from "@/core";
import { Element } from "./elements";
import { IconEyeOff, IconLock, IconUsersGroup } from "@tabler/icons-react";
import { Section } from "../components/Section";
import { useParams, useSearchParams } from "next/navigation";
import { useServices, useUser } from "@/data/hooks";

const Page = () => {

    const { username } = useParams<{ username: string }>();
    const sParams = useSearchParams();
    const query = buildQueryStrings(sParams);

    const { userServiceQueries: { useSearchUserFollowers } } = useServices();

    const { isMounted, token } = useUser();

    const accessToken = token ? token.access_token : null;
    const { data: response, isLoading, isFetching } = useSearchUserFollowers(accessToken, username, query, isMounted);

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
            return null;
        }
        if (response.type === 'ok') {
            const { content, ...page } = response.data;
            const emptyList = content.length === 0;
            return (
                <Section className="p-4 flex flex-col">
                    <Element.Header />
                    {isFetching
                        ? <Element.Loading />
                        : emptyList
                            ? <Element.Dialog
                                icon={IconUsersGroup}
                                title="Zero"
                                desc="Nenhum usuário."
                            />
                            :
                            <>
                                <Element.Main users={content} />
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