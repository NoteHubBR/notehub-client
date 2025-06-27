import { Element } from "./elements";
import { Flame } from "@/core";
import { Icon } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { Toggle } from "@/components/buttons";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
    flames: Flame[];
}

export { Skeleton as main } from './skeleton';

export const Main = ({ flames, ...rest }: MainProps) => {

    const { Section, PlainText, Time, Status, Title, Tags, Tag, Comments } = Element;

    return (
        <main className="my-4 flex flex-1 flex-col gap-3" {...rest}>
            {flames.map((flame) => (
                <Section key={flame.note.id}>
                    <article className="w-full flex flex-col gap-3">
                        <header className="relative pl-14 flex flex-col gap-1">
                            <Photo user={flame.note.user} size={44} className="absolute top-0 left-0" />
                            <PlainText className={`flex gap-1 ${!flame.note.user && 'line-through'}`}>
                                {flame.note.user && <Icon.Sponsor user={flame.note.user} size={24} />}
                                {flame.note.user ? flame.note.user.display_name : 'Deletado'}
                            </PlainText>
                            <Time flame={flame} />
                            <Status note={flame.note} />
                        </header>
                        <main className="-mt-1 pl-14 insm:pl-0 flex flex-col gap-1">
                            <Title note={flame.note} />
                            {flame.note.description && <PlainText className="text-sm">{flame.note.description}</PlainText>}
                            {flame.note.tags.length > 0 &&
                                <Tags>
                                    {flame.note.tags.map((tag, key) =>
                                        <Tag key={key} tag={tag} />
                                    )}
                                </Tags>
                            }
                        </main>
                        <footer className="mt-1 pl-12 insm:pl-0 flex items-center justify-between">
                            <Comments note={flame.note} />
                            <Toggle.Flame size={20} note={flame.note} useCount />
                        </footer>
                    </article>
                </Section>
            ))}
        </main>
    )

}