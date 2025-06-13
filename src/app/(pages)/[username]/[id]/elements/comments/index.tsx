import { Comment, Note, Page, Token, User } from "@/core";
import { Element } from "./elements";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useServices } from "@/data/hooks";

interface CommentsProps extends React.HTMLAttributes<HTMLElement> {
    token: Token | null;
    user: User | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const Comments = ({ token, user, note, setNote, ...rest }: CommentsProps) => {

    const { commentService: { getComments } } = useServices();

    const isFetching = useRef<boolean>(false);
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [page, setPage] = useState<Omit<Page<Comment>, 'content'>>({} as Omit<Page<Comment>, 'content'>);
    const [comments, setComments] = useState<Comment[]>([]);
    const [sort, setSort] = useState<"repliesCount,desc" | "createdAt,desc">("repliesCount,desc");

    const [isPending, startTransition] = useTransition();

    const init = useCallback(async () => {
        if (note.comments_count === 0 || isFetching.current || hasFetched) return;
        startTransition(async () => {
            try {
                isFetching.current = true;
                const { content, ...rest } = await getComments(note.id, `sort=${sort}&page=0`);
                setPage(rest)
                setComments(content);
            } catch (error) {
                throw error
            } finally {
                isFetching.current = false;
                setHasFetched(true);
            }
        })
    }, [getComments, hasFetched, note.comments_count, note.id, sort])

    const handleScroll = useCallback(async () => {
        if (note.comments_count === 0 || isFetching.current || page.last) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        startTransition(async () => {
            if (scrollTop + clientHeight >= scrollHeight) {
                try {
                    isFetching.current = true;
                    const { content, ...rest } = await getComments(note.id, `sort=${sort}&page=${page.page + 1}`);
                    setPage(rest);
                    setComments(prev => {
                        const existingIds = new Set(prev.map(c => c.id));
                        const newUniqueComments = content.filter(c => !existingIds.has(c.id));
                        return [...prev, ...newUniqueComments];
                    });
                } catch (error) {
                    throw error;
                } finally {
                    isFetching.current = false;
                    setHasFetched(true);
                }
            }
        })
    }, [getComments, note.comments_count, note.id, page.last, page.page, sort])

    useEffect(() => {
        init();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll, hasFetched, init])

    const { Header, CommentBox, CommentItem, Footer } = Element;

    return (
        <section
            className="w-[72.5%] inlg:w-full inmd:px-2 py-2"
            {...rest}
        >
            <Header
                sort={sort}
                note={note}
                setHasFetched={setHasFetched}
                setSort={setSort}
            />
            <CommentBox
                token={token}
                user={user}
                note={note}
                setNote={setNote}
                setComments={setComments}
            />
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <CommentItem
                            token={token}
                            user={user}
                            note={note}
                            comment={comment}
                            setNote={setNote}
                            setComments={setComments}
                        />
                    </li>
                ))}
            </ul>
            <Footer
                isPending={isPending}
            />
        </section>
    )

}