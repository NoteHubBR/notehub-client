import { Comment, Note, Token, User } from "@/core";
import { Form } from "@/components/forms";

interface CommentItem {
    token: Token | null;
    user: User | null;
    note: Note;
    comment: Comment;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const CommentItem = ({ token, user, note, comment, setNote, setComments }: CommentItem) => (
    <Form.Comment.Update
        key={comment.id}
        user={user}
        token={token}
        note={note}
        comment={comment}
        setComments={setComments}
        setNote={setNote}
    />
)