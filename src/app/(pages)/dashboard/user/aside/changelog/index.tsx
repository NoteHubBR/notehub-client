import { Element } from "./elements";
import { releases } from "@/shared";
import { useUser } from "@/data/hooks";

export const Changelog = () => {

    const { user } = useUser();

    const { Title, Li, Time, Scope, Change, Link } = Element;

    if (user) return (
        <section
            className="w-full h-fit p-3 rounded-[5px]
            border dark:border-light/10 border-dark/10
            dark:bg-darker bg-lighter
            inlg:h-full
            inmd:w-full"
        >
            <header>
                <Title>Últimas alterações</Title>
            </header>
            <ul className="p-3">
                {releases.slice(0, user.dev || user.sponsor ? 4 : 2).map((release, key) => (
                    <Li key={key}>
                        <div className='relative -top-1 flex items-center gap-1'>
                            <Scope scope={release.scope} />
                            <Time time={release.date} />
                        </div>
                        <Change toId={release.id}>{release.summary}</Change>
                    </Li>
                ))}
                <Li><Link /></Li>
            </ul>
        </section>
    )

    return <></>;

}