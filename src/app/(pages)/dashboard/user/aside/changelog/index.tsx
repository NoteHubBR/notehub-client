import { Element } from "./elements";
import { releases } from "@/shared";

export const Changelog = () => {

    const { Title, Li, Time, Change, Link } = Element;

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
                {releases.slice(0, 4).map((release, key) => (
                    <Li key={key}>
                        <Time time={release.date} />
                        <Change toId={release.version}>{release.summary}</Change>
                    </Li>
                ))}
                <Li><Link /></Li>
            </ul>
        </section>
    )

}