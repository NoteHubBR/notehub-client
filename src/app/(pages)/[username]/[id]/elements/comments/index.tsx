import { Comment, Note, Token, User } from "@/core";
import { Element } from "./elements";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServices } from "@/data/hooks";

interface CommentsProps {
    token: Token | null;
    user: User | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const Comments = ({ token, user, note, setNote }: CommentsProps) => {

    const { commentServiceQueries: { useGetComments } } = useServices();

    const isFetching = useRef<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [sort, setSort] = useState<"repliesCount,desc" | "createdAt,desc">("repliesCount,desc");

    const accessToken = token ? token.access_token : null;
    const { data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useGetComments(accessToken, note.id, sort, true);

    useEffect(() => {
        if (data) setComments(data.pages.flatMap(p => p.content) ?? []);
    }, [data])

    const handleScroll = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isFetching.current) return;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        if (scrollY + windowHeight >= docHeight - 1) {
            isFetching.current = true;
            fetchNextPage().finally(() => isFetching.current = false);
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    const { Header, CommentBox, CommentItem, Footer } = Element;

    if (data) return (
        <>
            <Header
                sort={sort}
                note={note}
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
                            isSorting={isLoading}
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
            <Footer isPending={isFetchingNextPage} />
        </>
    )

    return null;

}