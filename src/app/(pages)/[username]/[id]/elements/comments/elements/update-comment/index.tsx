import { Comment, Note, Token, User } from "@/core";
import { Form } from "@/components/forms";
import { Skeleton } from "./skeleton";

interface CommentItem {
    isSorting: boolean;
    token: Token | null;
    user: User | null;
    note: Note;
    comment: Comment;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const CommentItem = ({ isSorting, token, user, note, comment, setNote, setComments }: CommentItem) => {

    if (isSorting) return <Skeleton />

    else return (
        <Form.Comment.Update
            user={user}
            token={token}
            note={note}
            comment={comment}
            setComments={setComments}
            setNote={setNote}
        />
    )

}