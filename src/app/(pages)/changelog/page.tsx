import { Header, Release, ReleaseDesc, ReleaseOList, ReleaseTitle, ReleaseTopic, ReleaseUList } from "./elements";
import { ReleaseEntryType, releases } from "@/shared";

type ReleasesArray = typeof releases;
type ReleaseType = ReleasesArray[number];
type Entry = ReleaseType["entries"][number];

const Page = () => {

    const groupByType = (entries: Entry[]): Partial<Record<ReleaseEntryType, Entry[]>> =>
        entries.reduce<Partial<Record<ReleaseEntryType, Entry[]>>>((acc, e) => {
            const t = e.type as ReleaseEntryType;
            if (!acc[t]) acc[t] = [];
            acc[t]!.push(e);
            return acc;
        }, {})

    return (
        <main className="max-w-full w-screen insm:px-3 flex flex-col gap-12">
            <Header />
            <div className="max-w-[666px] w-full mx-auto flex flex-col gap-12">
                {releases.map((release: ReleaseType) => {
                    const grouped = groupByType(release.entries);
                    return (
                        <Release key={release.version}>
                            <ReleaseTitle tag={release.version}>({release.title})</ReleaseTitle>
                            <ReleaseUList>
                                {(Object.entries(grouped) as [ReleaseEntryType, Entry[]][]).map(([type, entries]) => (
                                    <ReleaseTopic key={type} type={type}>
                                        <ReleaseOList>
                                            {entries.map((entry: Entry, idx: number) => (
                                                <ReleaseDesc key={entry.hash ?? idx} pr={entry.pr} hash={entry.hash}>
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
            </div>
        </main>
    )

}

export default Page;