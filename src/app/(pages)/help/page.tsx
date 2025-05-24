'use client';

import { Element } from "./elements";
import { Items, items } from "./items";
import { useEffect, useState } from "react";

const Page = () => {

    const [query, setQuery] = useState<string>("");

    const filteredItems = query.length > 0
        ? items.filter(item => item.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase())))
        : [] as Items[];

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.slice(1);
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [])

    const { Header, Input, Li, Question, Answer } = Element;

    return (
        <section className="w-full h-full p-8 flex items-center justify-center dark:bg-darker bg-lighter">
            <div className="max-w-[666px] w-full h-full">
                <Header />
                <section className="mt-8">
                    <header className="flex items-center gap-3 justify-between">
                        <Input
                            placeholder="O que procura?"
                            query={query}
                            setQuery={setQuery}
                        />
                    </header>
                    <ul className="mt-6">
                        {query.length > 0
                            ?
                            filteredItems.map((item) => (
                                <Li key={item.id} id={item.id}>
                                    <Question hash={item.hash}>{item.question}</Question>
                                    <Answer hash={item.hash} useSupport={item.useSupport}>
                                        {item.answer}
                                    </Answer>
                                </Li>
                            ))
                            :
                            items.map((item) => (
                                <Li key={item.id} id={item.id}>
                                    <Question hash={item.hash}>{item.question}</Question>
                                    <Answer hash={item.hash} useSupport={item.useSupport}>
                                        {item.answer}
                                    </Answer>
                                </Li>
                            ))
                        }
                    </ul>
                </section>
            </div>
        </section>
    )

}

export default Page;