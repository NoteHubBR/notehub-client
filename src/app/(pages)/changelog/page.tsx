'use client';

import { Release, ReleaseDesc, ReleaseOList, ReleaseTitle, ReleaseTopic, ReleaseUList } from "./elements";
import { ReleaseEntryType, releases } from "@/shared";
import { Template } from '@/components/templates';
import { tryScrollTo } from "@/core";
import { useEffect, useState } from "react";

type ReleasesArray = typeof releases;
type ReleaseType = ReleasesArray[number];
type Entry = ReleaseType["entries"][number];

const Page = () => {

    const [currentId] = useState<string>(sessionStorage.getItem('scrollTo') ?? releases[0].id);

    const groupByType = (entries: Entry[]): Partial<Record<ReleaseEntryType, Entry[]>> =>
        entries.reduce<Partial<Record<ReleaseEntryType, Entry[]>>>((acc, e) => {
            const t = e.type as ReleaseEntryType;
            if (!acc[t]) acc[t] = [];
            acc[t]!.push(e);
            return acc;
        }, {})

    useEffect(() => {
        tryScrollTo();
    }, [])

    return (
        <Template.Legal title='Changelog'>
            {releases.map((release: ReleaseType, key: number) => {
                const grouped = groupByType(release.entries);
                return (
                    <Release key={key} id={release.id}>
                        <ReleaseTitle scope={release.scope} tag={release.version}>{release.title}</ReleaseTitle>
                        <ReleaseUList isActive={currentId === release.id}>
                            {(Object.entries(grouped) as [ReleaseEntryType, Entry[]][]).map(([type, entries]) => (
                                <ReleaseTopic key={type} type={type}>
                                    <ReleaseOList>
                                        {entries.map((entry: Entry, idx: number) => (
                                            <ReleaseDesc
                                                key={idx}
                                                scope={release.scope}
                                                pr={entry.pr}
                                                merged={entry.merged}
                                                hash={entry.hash}
                                            >
                                                {entry.desc}
                                            </ReleaseDesc>
                                        ))}
                                    </ReleaseOList>
                                </ReleaseTopic>
                            ))}
                        </ReleaseUList>
                    </Release>
                )
            })}
        </Template.Legal>
    )

}

export default Page;