import { Comment, Reply, Token, User } from "@/core";
import { Form } from "@/components/forms";

interface ReplyProps {
    token: Token | null;
    user: User | null;
    comment: Comment;
    useSelfReference?: boolean;
    selfReferenceReply?: Reply;
    isReplying: boolean;
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
    setRepliesCount: React.Dispatch<React.SetStateAction<number>>;
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReplyBox = ({ token, user, comment, useSelfReference, selfReferenceReply, isReplying, setReplies, setRepliesCount, setIsReplying }: ReplyProps) => {

    if (user && token && useSelfReference && selfReferenceReply) return (
        <Form.Reply.New
            token={token}
            user={user}
            comment={comment}
            useSelfReference
            selfReferenceReply={selfReferenceReply}
            isReplying={isReplying}
            setReplies={setReplies}
            setRepliesCount={setRepliesCount}
            setIsReplying={setIsReplying}
        />
    )

    if (user && token) return (
        <Form.Reply.New
            token={token}
            user={user}
            comment={comment}
            isReplying={isReplying}
            setReplies={setReplies}
            setRepliesCount={setRepliesCount}
            setIsReplying={setIsReplying}
        />
    )

}