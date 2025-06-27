import { Element } from "./elements";
import { Icon } from "@/components/icons";
import { LowDetailNote } from "@/core";
import { Photo } from "@/components/Photo";
import { Toggle } from "@/components/buttons";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
    notes: LowDetailNote[];
}

export { Skeleton as main } from './skeleton';

export const Main = ({ notes, ...rest }: MainProps) => {

    const { Section, PlainText, Time, Status, Title, Tags, Tag, Comments } = Element;

    return (
        <main className="my-4 flex flex-1 flex-col gap-3" {...rest}>
            {notes.map((note) => (
                <Section key={note.id}>
                    <article className="w-full flex flex-col gap-3">
                        <header className="relative pl-14 flex flex-col gap-1">
                            <Photo user={note.user} size={44} className="absolute top-0 left-0" />
                            <PlainText className={`flex gap-1 ${!note.user && 'line-through'}`}>
                                {note.user && <Icon.Sponsor user={note.user} size={24} />}
                                {note.user ? note.user.display_name : 'Deletado'}
                            </PlainText>
                            <Time note={note} />
                            <Status note={note} />
                        </header>
                        <main className="-mt-1 pl-14 insm:pl-0 flex flex-col gap-1">
                            <Title note={note} />
                            {note.description && <PlainText className="text-sm">{note.description}</PlainText>}
                            {note.tags.length > 0 &&
                                <Tags>
                                    {note.tags.map((tag, key) =>
                                        <Tag key={key} tag={tag} />
                                    )}
                                </Tags>
                            }
                        </main>
                        <footer className="mt-1 pl-12 insm:pl-0 flex items-center justify-between">
                            <Comments note={note} />
                            <Toggle.Flame size={20} note={note} useCount />
                        </footer>
                    </article>
                </Section>
            ))}
        </main>
    )

}