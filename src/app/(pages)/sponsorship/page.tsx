'use client';

import { Aside, Card, Header, LinesContainer, Section } from "./elements";
import { clsx } from "clsx";
import { Template } from "@/components/templates";
import { usePref, useUser } from "@/data/hooks";

const Page = () => {

    const { pref: { useDarkTheme } } = usePref();
    const { isMounted, user, token } = useUser();

    if (!isMounted) return;

    if (user) return (
        <LinesContainer>
            <Header />
            <Section className="inlg:hidden">
                <Aside />
            </Section>
            <Section
                className={clsx(
                    'inlg:mt-16 inmd:mt-0 inlg:items-start',
                    useDarkTheme ? 'dark-vignette-checkered' : 'light-vignette-checkered'
                )}
            >
                <Card token={token} />
            </Section>
        </LinesContainer >
    )

    return <Template.Forbidden />;

}

export default Page;