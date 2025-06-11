import { AuthService } from "../auth";
import { Comment, CreateCommentFormData } from "@/core";
import { useAPI } from "@/data/hooks";
import { UUID } from "crypto";

export const CommentService = () => {

    const { httpPost } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const createComment = async (token: string, id: UUID, data: CreateCommentFormData): Promise<Comment> => {
        const endpoint = `/notes/${id}/comments/new`;
        try {
            return await httpPost(endpoint, data, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, data, { useToken: newToken }));
        }
    }

    return { createComment }

}