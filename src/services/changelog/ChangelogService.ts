import { Log } from "@/core";
import { useCallback } from "react";

export const ChangelogService = () => {

    const getCommits = useCallback(async (): Promise<Log[]> => {
        const response = await fetch("https://api.github.com/repos/lucas-adm/next-react-xyz/commits?per_page=100");
        const raw = (await response.json()) as any[];
        const split = (text: string): string => text.split(/\r?\n\r?\n/)[0];
        const filtered: Log[] = raw.map((log) => ({
            commit: {
                committer: { date: log.commit.committer.date },
                author: { login: log.commit.author.login },
                message: split(log.commit.message),
            },
            html_url: log.html_url,
        }))

        return filtered;

    }, [])

    return { getCommits };

}