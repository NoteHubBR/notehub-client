import { ReplyService } from './ReplyService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';

export const ReplyServiceQueries = () => {

    const service = ReplyService();

    const useGetReplies = (token: string | null, id: UUID, enabled: boolean = true) => {
        return useInfiniteQuery({
            queryKey: ['replies', id],
            queryFn: ({ pageParam }: { pageParam: number }) => service.getReplies(token, id, `page=${pageParam}`),
            initialPageParam: 0,
            getNextPageParam: (page, _, pageParam) => page.last ? undefined : pageParam + 1,
            enabled: enabled,
            staleTime: 1000 * 60 * 5,
            retry: 3
        })
    }

    return { useGetReplies };

}