import { Element } from "./elements";
import { Log } from "@/core";
import { Skeleton } from "./skeleton";
import { useCallback, useEffect, useState } from "react";
import { useServices } from "@/data/hooks";

export const Changelog = () => {

    const { changelogService: { getCommits } } = useServices();

    const [commits, setCommits] = useState<Log[]>([]);

    const fetch = useCallback(async () => {
        return setCommits(await getCommits());
    }, [getCommits])

    useEffect(() => {
        // fetch();
    }, [fetch])

    const { Title, Li, Time, Change, Link } = Element;

    if (commits.length === 0) return <Skeleton />;

    return (
        <section
            className="w-full h-fit p-3 rounded-[5px]
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
            inlg:h-full
            inmd:w-full"
        >
            <header>
                <Title>Últimas alterações</Title>
            </header>
            <ul className="p-3">
                {commits.slice(0, 4).map((log, key) => (
                    <Li key={key}>
                        <Time time={log.commit.committer.date} />
                        <Change href={`${log.html_url}`}>{log.commit.message}</Change>
                    </Li>
                ))}
                <Li><Link /></Li>
            </ul>
        </section>
    )

}