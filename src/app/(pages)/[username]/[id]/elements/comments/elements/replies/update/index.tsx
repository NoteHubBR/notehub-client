import { Comment, Note, Reply, Token, User } from "@/core";
import { Form } from "@/components/forms";
import { ReplyBox } from "../new";
import { useState } from "react";

interface ReplyItemProps {
    token: Token | null;
    user: User | null;
    note: Note;
    comment: Comment;
    reply: Reply;
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
    setRepliesCount: React.Dispatch<React.SetStateAction<number>>;
}

export const ReplyItem = ({ token, user, note, comment, reply, setReplies, setRepliesCount }: ReplyItemProps) => {

    const [isReplying, setIsReplying] = useState<boolean>(false);

    return (
        <>
            <Form.Reply.Update
                token={token}
                user={user}
                note={note}
                reply={reply}
                setReplies={setReplies}
                setRepliesCount={setRepliesCount}
                setIsReplying={setIsReplying}
            />
            <ReplyBox
                user={user}
                token={token}
                comment={comment}
                useSelfReference
                selfReferenceReply={reply}
                isReplying={isReplying}
                setReplies={setReplies}
                setRepliesCount={setRepliesCount}
                setIsReplying={setIsReplying}
            />
        </>
    )

}