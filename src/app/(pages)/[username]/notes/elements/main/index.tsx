import { Element } from "./elements";
import { LowDetailNote } from "@/core";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/icons";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
    notes: LowDetailNote[];
}

export { Skeleton as main } from './skeleton';

export const Main = ({ notes, ...rest }: MainProps) => {

    return (
        <main className="my-4 flex flex-1 flex-col gap-3" {...rest}>
            {notes.map((note) => (
                <Element.Section key={note.id}>
                    <article className="w-full flex flex-col gap-3">
                        <header className="relative pl-14 flex flex-col gap-1">
                            <Photo user={note.user} size={44} className="absolute top-0 left-0" />
                            <Element.PlainText className="flex gap-1 ">
                                <Icon.Sponsor user={note.user} size={24} />
                                {note.user.display_name}
                            </Element.PlainText>
                            <Element.Time note={note} />
                            <Element.Status note={note} />
                        </header>
                        <main className="-mt-1 pl-14 insm:pl-0 flex flex-col gap-1">
                            <Element.Title note={note} />
                            <Element.PlainText className="text-sm">{note.description}</Element.PlainText>
                            <Element.Tags>
                                {note.tags.map((tag, key) =>
                                    <Element.Tag key={key} tag={tag} />
                                )}
                            </Element.Tags>
                        </main>
                        <footer className="mt-1 pl-12 insm:pl-0 flex items-center justify-between">
                            <Element.Comments note={note} />
                            <Element.Flame note={note} />
                        </footer>
                    </article>
                </Element.Section>
            ))}
        </main>
    )

}