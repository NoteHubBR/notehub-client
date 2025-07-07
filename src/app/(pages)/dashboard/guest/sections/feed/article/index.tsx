import { Author, Creator, Desc, Flame, Link, Message, Time } from "./elements";
import { Component } from "@/components";

interface ArticleProps extends React.HTMLAttributes<HTMLElement> {
    photo: string;
    author: string;
    message: string;
    createdAt: string;
    title: string;
    desc?: string;
    flamesCount: number;
}

export const Article = ({ photo, author, message, createdAt, title, desc, flamesCount, ...rest }: ArticleProps) => (
    <article
        className="p-3 rounded
        flex flex-col gap-2
        dark:bg-dark bg-light
        dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md"
        {...rest}
    >
        <header className="flex items-center gap-3">
            <Creator src={photo} />
            <div className="flex flex-col">
                <p className="text-sm">
                    <Author>{author}</Author>
                    <Message>{message}</Message>
                </p>
                <Time>{createdAt}</Time>
            </div>
        </header>
        <section className="p-3 rounded flex flex-col gap-2 dark:bg-semidark bg-semilight">
            <header className="flex items-center gap-2">
                <Component.Mock src={photo} size={25} />
                <Link>{author} / {title}</Link>
            </header>
            {desc && <Desc>{desc}</Desc>}
            <footer className="flex items-center gap-2">
                <Flame number={flamesCount} />
            </footer>
        </section>
    </article>
)