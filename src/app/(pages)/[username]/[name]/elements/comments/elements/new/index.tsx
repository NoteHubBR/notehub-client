import { Comment, Note, Token, User } from "@/core";
import { Dialog } from "./Dialog";
import { Form } from "@/components/forms";

interface CommentProps {
    token: Token | null;
    user: User | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const CommentBox = ({ token, user, note, setNote, setComments }: CommentProps) => {

    if (token && user && note.closed) return (
        <Dialog>A nota está fechada para novas interações.</Dialog>
    )

    if (token && user) return (
        <Form.Comment.New
            user={user}
            token={token}
            note={note}
            setNote={setNote}
            setComments={setComments}
        />
    )

    return (
        <Dialog useLoginLink>Para comentar é preciso estar logado.</Dialog>
    )

}