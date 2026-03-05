import { CommentService } from './CommentService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';

export const CommentServiceQueries = () => {

    const service = CommentService();

    const useGetComments = (token: string | null, id: UUID, sort: string, enabled: boolean = true) => {
        return useInfiniteQuery({
            queryKey: ['comments', id, sort],
            queryFn: ({ pageParam }: { pageParam: number }) => service.getComments(token, id, `sort=${sort}&page=${pageParam}`),
            initialPageParam: 0,
            getNextPageParam: (page, _, pageParam) => page.last ? undefined : pageParam + 1,
            enabled,
            staleTime: 1000 * 60 * 5,
            retry: 3
        })
    }

    return { useGetComments };

}