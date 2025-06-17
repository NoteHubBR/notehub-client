import { AuthService } from "../auth";
import { CreateReplyFormData, Page, Reply } from "@/core";
import { useAPI } from "@/data/hooks";
import { UUID } from "crypto";

export const ReplyService = () => {

    const { httpPost, httpGet, httpPatch, httpDelete } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const createReply = async (token: string, id: UUID, data: CreateReplyFormData): Promise<Reply> => {
        const endpoint = `/notes/comments/${id}/replies/new`;
        try {
            return await httpPost(endpoint, data, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, data, { useToken: newToken }));
        }
    }

    const createSelfReferenceReply = async (token: string, id: UUID, data: CreateReplyFormData): Promise<Reply> => {
        const endpoint = `/notes/comments/replies/${id}/new`;
        try {
            return await httpPost(endpoint, data, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, data, { useToken: newToken }));
        }
    }

    const getReplies = async (id: UUID, parameters?: string): Promise<Page<Reply>> => {
        const endpoint = `/notes/comments/${id}/replies?${parameters}`;
        try {
            return await httpGet(endpoint);
        } catch (error) {
            throw error;
        }
    }

    const editReply = async (token: string, id: UUID, data: CreateReplyFormData): Promise<Reply> => {
        const endpoint = `/notes/comments/replies/${id}/edit`;
        try {
            return await httpPatch(endpoint, data, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpPatch(endpoint, data, { useToken: newToken }));
        }
    }

    const deleteReply = async (token: string, id: UUID) => {
        const endpoint = `/notes/comments/replies/${id}/delete`;
        try {
            return await httpDelete(endpoint, undefined, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpDelete(endpoint, undefined, { useToken: newToken }));
        }
    }

    return { createReply, createSelfReferenceReply, getReplies, editReply, deleteReply };

}