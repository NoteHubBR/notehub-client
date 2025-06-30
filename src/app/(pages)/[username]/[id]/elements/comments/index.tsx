import { Comment, Note, Page, Token, User } from "@/core";
import { Element } from "./elements";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useServices } from "@/data/hooks";

interface CommentsProps {
    token: Token | null;
    user: User | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const Comments = ({ token, user, note, setNote }: CommentsProps) => {

    const { commentService: { getComments } } = useServices();

    const isFetching = useRef<boolean>(false);
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [page, setPage] = useState<Omit<Page<Comment>, 'content'>>({} as Omit<Page<Comment>, 'content'>);
    const [comments, setComments] = useState<Comment[]>([]);
    const [sort, setSort] = useState<"repliesCount,desc" | "createdAt,desc">("repliesCount,desc");
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const [isPending, startTransition] = useTransition();

    const init = useCallback(async () => {
        if (note.comments_count === 0 || isFetching.current || hasFetched) return;
        setIsSorting(true);
        startTransition(async () => {
            try {
                isFetching.current = true;
                const accessToken = token ? token.access_token : null;
                const { content, ...rest } = await getComments(accessToken, note.id, `sort=${sort}&page=0`);
                setPage(rest);
                setComments(content);
            } catch (error) {
                throw error;
            } finally {
                isFetching.current = false;
                setIsSorting(false);
                setHasFetched(true);
            }
        })
    }, [getComments, hasFetched, note.comments_count, note.id, sort, token])

    const handleScroll = useCallback(async () => {
        if (note.comments_count === 0 || isFetching.current || page.last) return;
        startTransition(async () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollY + windowHeight >= docHeight - 1) {
                try {
                    isFetching.current = true;
                    const accessToken = token ? token.access_token : null;
                    const { content, ...rest } = await getComments(accessToken, note.id, `sort=${sort}&page=${page.page + 1}`);
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
    }, [getComments, note.comments_count, note.id, page.last, page.page, sort, token])

    useEffect(() => {
        init();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll, hasFetched, init])

    const { Header, CommentBox, CommentItem, Footer } = Element;

    return (
        <>
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
                            isSorting={isSorting}
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
            <Footer isPending={isPending} />
        </>
    )

}