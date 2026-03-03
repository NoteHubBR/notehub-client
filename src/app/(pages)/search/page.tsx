'use client';

import { buildQueryStrings, LowDetailNote, LowDetailUser } from "@/core";
import { Device } from "@/components/devices";
import { Element } from "./elements";
import { useSearchParams } from "next/navigation";
import { useServices } from "@/data/hooks";
import { useState } from "react";

const Page = () => {

    const sParams = useSearchParams();
    const query = buildQueryStrings(sParams);
    const [q, setQ] = useState<string>(sParams.get('q') ?? '');
    const type = sParams.get('type');

    const {
        userServiceQueries: { useSearchUsers },
        noteServiceQueries: { useSearchNotes, useSearchTags }
    } = useServices();

    const { data: notesData, isLoading: notesLoading, isFetching: notesFetching } = useSearchNotes(query, type === 'notes' || !type);
    const { data: usersData, isLoading: usersLoading, isFetching: usersFetching } = useSearchUsers(query, type === 'users');
    const { data: tagsData, isLoading: tagsLoading, isFetching: tagsFetching } = useSearchTags(query, type === 'tags');

    const isLoading = usersLoading || notesLoading || tagsLoading;
    const isFetching = usersFetching || notesFetching || tagsFetching;

    const page = type === 'users' ? usersData : type === 'tags' ? tagsData : notesData;
    const contents = page ? page.content as (LowDetailUser | LowDetailNote)[] : [];

    const { Header, Aside, Results, Loading } = Element;

    if (isLoading) return (
        <div className="w-full h-full py-4 px-4 inlg:px-2 inmd:p-0 flex flex-col gap-6 inmd:gap-0 dark:bg-dark bg-light">
            <Device.Mobile.Header.SearchHeader query={q} setQuery={setQ} disabled />
            <div className="w-full h-full flex flex-col">
                <Element.header />
                <div className="max-w-[888px] w-full m-auto flex-1 flex justify-center gap-3 inlg:flex-col inlg:gap-0">
                    <Element.aside />
                    <Element.results />
                </div>
            </div>
        </div>
    )

    if (page) return (
        <main className="w-full h-full py-4 px-4 inlg:px-2 inmd:p-0 flex flex-col gap-6 inmd:gap-0 dark:bg-dark bg-light">
            <Device.Mobile.Header.SearchHeader query={q} setQuery={setQ} />
            <section className="w-full h-full flex flex-col">
                <Header />
                <section className="max-w-[888px] w-full m-auto flex-1 flex justify-center gap-3 inlg:flex-col inlg:gap-0">
                    <Aside />
                    {isFetching
                        ? <Loading />
                        : <Results
                            page={page}
                            contents={contents}
                            isEmpty={contents.length === 0}
                            totalElements={page.totalElements}
                        />
                    }
                </section>
            </section>
        </main>
    )

    return null;

}

export default Page;