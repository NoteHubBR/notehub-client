import { AuthService } from "../auth";
import { Comment, CreateCommentFormData, Page } from "@/core";
import { useAPI } from "@/data/hooks";
import { UUID } from "crypto";

export const CommentService = () => {

    const { httpPost, httpGet, httpPatch, httpDelete } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const createComment = async (token: string, id: UUID, data: CreateCommentFormData): Promise<Comment> => {
        const endpoint = `/notes/${id}/comments/new`;
        try {
            return await httpPost(endpoint, data, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, data, { useToken: newToken }));
        }
    }

    const getComments = async (id: UUID, parameters?: string): Promise<Page<Comment>> => {
        const endpoint = `/notes/${id}/comments?${parameters}`;
        try {
            return await httpGet(endpoint);
        } catch (error) {
            throw error;
        }
    }

    const editComment = async (token: string, id: UUID, data: CreateCommentFormData): Promise<Comment> => {
        const endpoint = `/notes/comments/${id}/edit`;
        try {
            return await httpPatch(endpoint, data, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPatch(endpoint, data, { useToken: newToken }));
        }
    }

    const deleteComment = async (token: string, id: UUID) => {
        const endpoint = `/notes/comments/${id}/delete`;
        try {
            return await httpDelete(endpoint, undefined, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, undefined, { useToken: newToken }));
        }
    }

    return { createComment, getComments, editComment, deleteComment };

}