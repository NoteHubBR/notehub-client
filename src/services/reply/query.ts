import { Page, Reply } from '@/core';
import { ReplyService } from './service';
import { useInfinitePagedQuery } from '../utils';
import { UUID } from 'crypto';

export const createReplyQuery = (service: ReplyService) => {

    const useGetReplies = (token: string | null, id: UUID, enabled: boolean = true) => {
        return useInfinitePagedQuery<Page<Reply>>({
            keys: ['replies', token, id],
            function: (page) => service.getReplies(token, id, `page=${page}`),
            enabled: enabled
        })
    }

    return { useGetReplies };

}