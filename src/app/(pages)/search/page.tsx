'use client';

import { Device } from "@/components/devices";
import { Element } from "./elements";
import { useFollowing } from "@/data/hooks";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Page = () => {

    const params = useSearchParams();
    const q = params.get('q') ?? '';

    const [query, setQuery] = useState<string>(q);

    const { page: page, users } = useFollowing();

    const { Header, Aside, Results } = Element;

    return (
        <main className="w-full h-full py-4 px-4 inlg:px-2 inmd:p-0 flex flex-col gap-6 inmd:gap-0 dark:bg-dark bg-light">
            <Device.Mobile.Header.SearchHeader query={query} setQuery={setQuery} />
            <section className="w-full h-full flex flex-col">
                <Header />
                <section
                    className="max-w-[999px] w-full m-auto flex-1 flex justify-center gap-3
                    inlg:flex-col inlg:gap-0"
                >
                    <Aside />
                    <Results page={page} contents={users} />
                </section>
            </section>
        </main >
    )

}

export default Page