import { Comment, Note, Page, Reply, Token, User } from "@/core";
import { Form } from "@/components/forms";
import { Loader, ReplyBox, ReplyItem } from "../replies";
import { Skeleton } from "./skeleton";
import { useState } from "react";

interface CommentItemProps {
    isSorting: boolean;
    token: Token | null;
    user: User | null;
    note: Note;
    comment: Comment;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const CommentItem = ({ isSorting, token, user, note, comment, setNote, setComments }: CommentItemProps) => {

    const [repliesCount, setRepliesCount] = useState<number>(comment.replies_count ?? 0);
    const [repliesPage, setRepliesPage] = useState<Omit<Page<Reply>, 'content'>>({} as Omit<Page<Reply>, 'content'>);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [isRepliesListOpen, setIsRepliesListOpen] = useState<boolean>(false);

    if (isSorting) return <Skeleton />;

    else return (
        <>
            <Form.Comment.Update
                user={user}
                token={token}
                note={note}
                comment={comment}
                repliesCount={repliesCount}
                isRepliesListOpen={isRepliesListOpen}
                setNote={setNote}
                setComments={setComments}
                setRepliesPage={setRepliesPage}
                setReplies={setReplies}
                setIsReplying={setIsReplying}
                setIsRepliesListOpen={setIsRepliesListOpen}
            />
            <ReplyBox
                user={user}
                token={token}
                comment={comment}
                isReplying={isReplying}
                setReplies={setReplies}
                setRepliesCount={setRepliesCount}
                setIsReplying={setIsReplying}
            />
            <ul hidden={!isRepliesListOpen}>
                {replies.map((reply) => (
                    <li key={reply.id}>
                        <ReplyItem
                            token={token}
                            user={user}
                            note={note}
                            comment={comment}
                            reply={reply}
                            setReplies={setReplies}
                            setRepliesCount={setRepliesCount}
                        />
                    </li>
                ))}
            </ul>
            <Loader
                token={token}
                isRepliesListOpen={isRepliesListOpen}
                comment={comment}
                page={repliesPage}
                setPage={setRepliesPage}
                setReplies={setReplies}
            />
        </>
    )

}