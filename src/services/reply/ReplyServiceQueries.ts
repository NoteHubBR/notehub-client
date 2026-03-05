import { ReplyService } from './ReplyService';
import { useInfinitePagedQuery } from '../utils';
import { UUID } from 'crypto';

export const ReplyServiceQueries = () => {

    const service = ReplyService();

    const useGetReplies = (token: string | null, id: UUID, enabled: boolean = true) => {
        return useInfinitePagedQuery({
            keys: ['replies', token, id],
            function: (page) => service.getReplies(token, id, `page=${page}`),
            enabled: enabled
        })
    }

    return { useGetReplies };

}