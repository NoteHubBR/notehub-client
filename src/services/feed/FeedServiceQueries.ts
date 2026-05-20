import { FeedEvent, Page } from '@/core';
import { FeedService } from './FeedService';
import { useInfinitePagedQuery } from '../utils';

export const FeedServiceQueries = () => {

    const service = FeedService();

    const useGetFeed = (token: string, params?: string, enabled: boolean = true) => {
        return useInfinitePagedQuery<Page<FeedEvent>>({
            keys: ['feed', token, params],
            function: (page) => service.getFeed(token, `page=${page}`),
            enabled: enabled
        })
    }

    return { useGetFeed };

}