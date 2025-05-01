export type Log = {
    commit: {
        committer: { date: string }
        author: { login: string }
        message: string;
    },
    html_url: string;
}