import { Comment, Page } from '@/core';
import { CommentService } from './CommentService';
import { useInfinitePagedQuery } from '../utils';
import { UUID } from 'crypto';

export const CommentServiceQueries = () => {

    const service = CommentService();

    const useGetComments = (token: string | null, id: UUID, sort: string, enabled: boolean = true) => {
        return useInfinitePagedQuery<Page<Comment>>({
            keys: ['comments', token, id, sort],
            function: (page) => service.getComments(token, id, `sort=${sort}&page=${page}`),
            enabled
        })
    }

    return { useGetComments };

}