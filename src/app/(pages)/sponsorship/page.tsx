'use client';

import { Aside, Card, Header, LinesContainer, Section } from "./elements";
import { clsx } from "clsx";
import { usePref } from "@/data/hooks";

const Page = () => {

    const { pref: { useDarkTheme } } = usePref();

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
                <Card />
            </Section>
        </LinesContainer >
    )

}

export default Page;