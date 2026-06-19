import { ApiClient } from '@/api';
import { Comment, CreateCommentFormData, Page } from "@/core";
import { UUID } from "crypto";
import { WithRetry } from './../auth/service';

export const createCommentService = (api: ApiClient, withRetry: WithRetry) => {

    const createComment = async (token: string, id: UUID, data: CreateCommentFormData): Promise<Comment> => {
        const endpoint = `/notes/${id}/comments/new`;
        return withRetry(token, (token) => api.post(endpoint, data, { token: token }));
    }

    const getComments = async (token: string | null, id: UUID, parameters?: string): Promise<Page<Comment>> => {
        const endpoint = `/notes/${id}/comments?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const editComment = async (token: string, id: UUID, data: CreateCommentFormData): Promise<Comment> => {
        const endpoint = `/notes/comments/${id}/edit`;
        return withRetry(token, (token) => api.patch(endpoint, data, { token: token }));
    }

    const deleteComment = async (token: string, id: UUID) => {
        const endpoint = `/notes/comments/${id}/delete`;
        return withRetry(token, (token) => api.delete(endpoint, undefined, { token: token }));
    }

    return { createComment, getComments, editComment, deleteComment };

}

export type CommentService = ReturnType<typeof createCommentService>;