import { Element } from "./elements";
import { IconCopy, IconDownload, IconMessageCircle, IconMessageCircleOff } from '@tabler/icons-react';
import { Note } from "@/core";
import { Toggle } from "@/components/buttons";

interface AsideProps extends React.HTMLAttributes<HTMLElement> {
    triggerRef: React.RefObject<HTMLButtonElement>;
    note: Note;
    author: string | null;
    currentUser: string | null;
}

export const Aside = ({ triggerRef, note, author, currentUser, ...rest }: AsideProps) => {

    const isAuthor = author === currentUser;

    const { Settings, Time, Author, Tags, Action } = Element;

    const download = () => {
        const blob = new Blob([note.markdown], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${note.title}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const copy = async () => await navigator.clipboard.writeText(note.markdown);

    const scrollToCommentBox = () => {
        const commentWrapperEl = document.getElementById("comment-wrapper");
        const commentBoxEl = document.getElementById("comment");
        if (commentWrapperEl) commentWrapperEl.scrollIntoView({ behavior: "smooth" });
        if (commentBoxEl) commentBoxEl.focus({ preventScroll: true });
    }

    return (
        <aside className="max-w-[275px] inlg:max-w-full w-full inmd:dark:bg-darker inmd:bg-lighter" {...rest}>
            <header className="px-4 flex items-center justify-between border-y border-transparent dark:border-b-middark/50 border-b-midlight/50">
                <h3 className="py-3 inlg:py-2">Sobre</h3>
                {isAuthor && <Settings ref={triggerRef} />}
            </header>
            <section className="px-4 pt-4 flex flex-col gap-4">
                <Time note={note} />
                {note.user && <Author note={note} />}
                {note.description && <p>{note.description}</p>}
                {note.tags.length > 0 && <Tags note={note} />}
            </section>
            <footer className="px-4 py-6 flex flex-col inlg:flex-row gap-4 insm:gap-2">
                <Action icon={IconDownload} action="Baixar" onClick={download} />
                <Action icon={IconCopy} action="Copiar" onClick={copy} />
                <Toggle.Flame size={18} note={note} useCount />
                <Action
                    icon={note.closed ? IconMessageCircleOff : IconMessageCircle}
                    action={note.comments_count}
                    onClick={scrollToCommentBox}
                />
            </footer>
        </aside>
    )

}