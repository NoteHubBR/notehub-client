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
    return (
        <main className="my-4 flex flex-1 flex-col gap-3" {...rest}>
            {flames.map((flame) => (
                <Element.Section key={flame.note.id}>
                    <article className="w-full flex flex-col gap-3">
                        <header className="relative pl-14 flex flex-col gap-1">
                            <Photo user={flame.note.user} size={44} className="absolute top-0 left-0" />
                            <Element.PlainText className="flex gap-1 ">
                                <Icon.Sponsor user={flame.note.user} size={24} />
                                {flame.note.user.display_name}
                            </Element.PlainText>
                            <Element.Time flame={flame} />
                            <Element.Status note={flame.note} />
                        </header>
                        <main className="-mt-1 pl-14 insm:pl-0 flex flex-col gap-1">
                            <Element.Title note={flame.note} />
                            <Element.PlainText className="text-sm">{flame.note.description}</Element.PlainText>
                            <Element.Tags>
                                {flame.note.tags.map((tag, key) =>
                                    <Element.Tag key={key} tag={tag} />
                                )}
                            </Element.Tags>
                        </main>
                        <footer className="mt-1 pl-12 insm:pl-0 flex items-center justify-between">
                            <Element.Comments note={flame.note} />
                            <Toggle.Flame size={20} note={flame.note} useCount />
                        </footer>
                    </article>
                </Element.Section>
            ))}
        </main>
    )
}