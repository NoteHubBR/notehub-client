'use client';

import { Element } from "./elements";
import { isEmpty } from "@/core";
import { Section } from "../components/Section";
import { useNotes } from "@/data/hooks";

const Page = () => {

    const { page, notes } = useNotes();

    if (isEmpty(page) || isEmpty(notes)) return (
        <Section className="px-4 py-2">
            <Element.header />
            <Element.main />
            <Element.footer />
        </Section>
    )

    return (
        <Section className="px-4 py-2">
            <Element.Header />
            <Element.Main notes={notes} />
            <Element.Footer page={page} />
        </Section>
    )

}

export default Page;