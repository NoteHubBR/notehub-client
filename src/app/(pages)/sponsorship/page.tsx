'use client';

import { Aside, Card, Header, LinesContainer, Section } from "./elements";
import { clsx } from "clsx";
import { usePref, useUser } from "@/data/hooks";

const Page = () => {

    const { pref: { useDarkTheme } } = usePref();
    const { token } = useUser();

    return (
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

}

export default Page;