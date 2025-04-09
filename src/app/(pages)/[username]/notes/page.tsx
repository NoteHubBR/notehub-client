'use client';

import { Element } from "./elements";
import { Section } from "../components/Section";
import { useNotes } from "@/data/hooks";

const Page = () => {

    const { notes } = useNotes();

    return (
        <Section className="px-4 py-2">
            <Element.Header />
            <Element.Main notes={notes} />
        </Section>
    )

}

export default Page;