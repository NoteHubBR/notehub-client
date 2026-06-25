import { ApiClient } from '@/api';
import { CreateReplyFormData, Page, Reply } from "@/core";
import { UUID } from "crypto";
import { WithRetry } from '../auth';

export const createReplyService = (api: ApiClient, withRetry: WithRetry) => {

    const createReply = async (token: string, id: UUID, data: CreateReplyFormData): Promise<Reply> => {
        const endpoint = `/notes/comments/${id}/replies/new`;
        return withRetry(token, (token) => api.post(endpoint, data, { token: token }));
    }

    const createSelfReferenceReply = async (token: string, id: UUID, data: CreateReplyFormData): Promise<Reply> => {
        const endpoint = `/notes/comments/replies/${id}/new`;
        return withRetry(token, (token) => api.post(endpoint, data, { token: token }));
    }

    const getReplies = async (token: string | null, id: UUID, parameters?: string): Promise<Page<Reply>> => {
        const endpoint = `/notes/comments/${id}/replies?${parameters}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    const editReply = async (token: string, id: UUID, data: CreateReplyFormData): Promise<void> => {
        const endpoint = `/notes/comments/replies/${id}/edit`;
        return withRetry(token, (token) => api.patch(endpoint, data, { token: token }));
    }

    const deleteReply = async (token: string, id: UUID): Promise<void> => {
        const endpoint = `/notes/comments/replies/${id}/delete`;
        return withRetry(token, (token) => api.delete(endpoint, undefined, { token: token }));
    }

    return { createReply, createSelfReferenceReply, getReplies, editReply, deleteReply };

}

export type ReplyService = ReturnType<typeof createReplyService>;