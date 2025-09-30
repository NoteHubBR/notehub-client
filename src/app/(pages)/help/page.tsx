'use client';

import { Element } from "./elements";
import { Items, items } from "./items";
import { tryScrollTo } from "@/core";
import { useEffect, useState } from "react";

const Page = () => {

    const [currentId, setCurrentId] = useState<string>(sessionStorage.getItem('scrollTo') ?? 'none');
    const [query, setQuery] = useState<string>("");

    const filteredItems = query.length > 0
        ? items.filter(item => item.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase())))
        : [] as Items[];

    useEffect(() => {
        return tryScrollTo();
    }, [currentId])

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
                                    <Question currentId={currentId} setCurrentId={setCurrentId} hash={item.id}>{item.question}</Question>
                                    <Answer currentId={currentId} hash={item.id} useSupport={item.useSupport}>
                                        {item.answer}
                                    </Answer>
                                </Li>
                            ))
                            :
                            items.map((item) => (
                                <Li key={item.id} id={item.id}>
                                    <Question currentId={currentId} setCurrentId={setCurrentId} hash={item.id}>{item.question}</Question>
                                    <Answer currentId={currentId} hash={item.id} useSupport={item.useSupport}>
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